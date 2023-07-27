import { adminClient } from '@lib/sanity';

const { log } = console;

export interface UpdateProductInventory {
  id: string;
  sku: string | boolean;
  quantity: number;
}

export const updateSkuInventory = async ({ id, sku, quantity }: UpdateProductInventory) => {
  let product;

  try {
    product = await adminClient.getDocument(id); // Document ID to patch

    const skuIndex = product.variants.findIndex((item) => item.sku === sku);

    if (skuIndex === -1) return false;

    const updatedProduct = adminClient
      .patch(id) // Document ID to patch
      .dec({ [`variants[${skuIndex}].inventory`]: quantity })
      .commit(); // Perform the patch and return a promise

    return updatedProduct;
  } catch (error) {
    log(error);
  }
};

export const updatePrimaryInventory = async ({ id, quantity }: UpdateProductInventory) => {
  try {
    const updatedProduct = adminClient
      .patch(id) // Document ID to patch
      .dec({ [`inventory`]: 1 })
      .commit(); // Perform the patch and return a promise

    return updatedProduct;
  } catch (error) {
    log(error);
  }
};

export const updateProductInventory = async ({
  id,
  sku = false,
  quantity,
}: UpdateProductInventory) => {
  if (sku) {
    log('Updating with sku', id, sku, quantity);
    updateSkuInventory({ id, sku, quantity });
  } else {
    log('Updating primary inventory', id, sku, quantity);
    updatePrimaryInventory({ id, quantity, sku: false });
  }
};
