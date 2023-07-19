export const validateItem = ({ product, inventory }) => {
  const { id, quantity } = product;
  let valid = false;

  if (!id || !quantity) {
    throw new Error(`id and quantity are required`);
  }

  if (typeof id !== 'string' || typeof quantity !== 'number') {
    throw new Error(`id must be a string and quantity must be a number`);
  }

  inventory.find((item) => {});

  return valid;
};

export default function validateCart({ cart, inventory = [] }) {
  // console.log('cartItems', cart);
  const validItems = Object.keys(cart).reduce((items, product) => {
    if (validateItem({ product, inventory })) {
      return [...items, product];
    }

    return items;
  }, []);

  return validItems;
}
