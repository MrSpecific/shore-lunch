import CommerceSDK from '@chec/commerce.js';

const commerce = new CommerceSDK(process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY);

export default commerce;

export const getCart = async () => {
  try {
    return await commerce.cart.retrieve();
  } catch (err) {
    console.log(err);
  }
};
