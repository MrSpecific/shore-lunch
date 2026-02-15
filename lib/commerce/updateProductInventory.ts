import { adminClient } from '@lib/sanity';

const { log } = console;

export interface UpdateProductInventory {
  id: string;
  sku: string | boolean;
  quantity: number;
}

const MAX_RETRIES = 3;

const isRevisionConflict = (error: any) => {
  const message = String(error?.message || '');
  const statusCode = Number(error?.statusCode);

  return statusCode === 409 || message.toLowerCase().includes('revision');
};

const assertValidQuantity = (quantity: number) => {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error(`Invalid quantity "${quantity}" for inventory update`);
  }
};

export const updateSkuInventory = async ({ id, sku, quantity }: UpdateProductInventory) => {
  assertValidQuantity(quantity);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const product = await adminClient.getDocument(id);
      if (!product) throw new Error(`Product "${id}" not found`);
      if (!Array.isArray(product.variants)) {
        throw new Error(`Product "${id}" has no variants array`);
      }

      const skuIndex = product.variants.findIndex((item) => item.sku === sku);
      if (skuIndex === -1) {
        throw new Error(`SKU "${sku}" not found for product "${id}"`);
      }

      const currentInventory = Number(product.variants[skuIndex]?.inventory ?? 0);
      if (currentInventory < quantity) {
        throw new Error(
          `Insufficient inventory for SKU "${sku}" on "${id}". Have ${currentInventory}, need ${quantity}`
        );
      }

      return await adminClient
        .patch(id)
        .ifRevisionId(product._rev)
        .dec({ [`variants[${skuIndex}].inventory`]: quantity })
        .commit();
    } catch (error) {
      if (attempt < MAX_RETRIES && isRevisionConflict(error)) continue;
      throw error;
    }
  }

  throw new Error(`Failed to update inventory for SKU "${sku}" on "${id}"`);
};

export const updatePrimaryInventory = async ({ id, quantity }: UpdateProductInventory) => {
  assertValidQuantity(quantity);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const product = await adminClient.getDocument(id);
      if (!product) throw new Error(`Product "${id}" not found`);

      const currentInventory = Number(product.inventory ?? 0);
      if (currentInventory < quantity) {
        throw new Error(
          `Insufficient inventory for product "${id}". Have ${currentInventory}, need ${quantity}`
        );
      }

      return await adminClient
        .patch(id)
        .ifRevisionId(product._rev)
        .dec({ inventory: quantity })
        .commit();
    } catch (error) {
      if (attempt < MAX_RETRIES && isRevisionConflict(error)) continue;
      throw error;
    }
  }

  throw new Error(`Failed to update inventory for product "${id}"`);
};

export const updateProductInventory = async ({
  id,
  sku = false,
  quantity,
}: UpdateProductInventory) => {
  try {
    if (sku) {
      log('Updating with sku', id, sku, quantity);
      return await updateSkuInventory({ id, sku, quantity });
    }

    log('Updating primary inventory', id, sku, quantity);
    return await updatePrimaryInventory({ id, quantity, sku: false });
  } catch (error) {
    log('Inventory update failed', { id, sku, quantity, error });
    throw error;
  }
};
