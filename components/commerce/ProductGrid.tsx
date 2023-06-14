import ProductCard from '@commerce/ProductCard';
import styles from '@styles/components/commerce/ProductGrid.module.css';

const ProductGrid: any = ({ results: products }) => {
  // return <>{JSON.stringify(props)}</>;
  if (!products) return null;

  return (
    <section className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
