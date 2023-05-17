import handleize from '@utils/handleize';

export default function transformProduct({ id, name, description, image, default_price }) {
  return {
    _id: id,
    _type: 'product',
    title: name,
    slug: {
      _type: 'slug',
      current: handleize(name),
    },
    description,
    price: default_price?.unit_amount,
  };
  // pattern: externalCat.pattern,
}
