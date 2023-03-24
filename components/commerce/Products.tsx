import products from '@data/products';
import { formatCurrencyString } from 'use-shopping-cart';
import { useShoppingCart } from 'use-shopping-cart';
import ProductCard from '@commerce/ProductCard';

const Products = () => {
  const { addItem, removeItem } = useShoppingCart();

  return (
    <section
      className="products"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default Products;
