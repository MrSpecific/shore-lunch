import { adminClient } from '@lib/sanity';

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
    console.log(error);
  }
};

export const updateProductInventory = async ({
  id,
  sku = false,
  quantity,
}: UpdateProductInventory) => {
  if (sku) {
    updateSkuInventory({ id, sku, quantity });
  } else {
    try {
      await adminClient
        .patch(id) // Document ID to patch
        .dec({ [`inventory`]: 1 })
        .commit(); // Perform the patch and return a promise
      // .then((updatedProduct) => {
      //   console.log('Hurray, the product is updated! New document:');
      //   console.log(updatedProduct);
      // })
      // .catch((err) => {
      //   console.error('Oh no, the update failed: ', err.message);
      // });
    } catch (error) {
      console.log(error);
    }
  }
};
