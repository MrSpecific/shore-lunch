export default function transformProduct({ id, description, price }) {
  return {
    _id: id,
    _type: 'product',
    description,
    price,
    // pattern: externalCat.pattern,
  };
}
