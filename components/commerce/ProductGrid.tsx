import products from '@data/products';
import ProductCard from '@commerce/ProductCard';
import styles from '@styles/components/commerce/ProductGrid.module.css';

const ProductGrid = () => {
  return (
    <section className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
