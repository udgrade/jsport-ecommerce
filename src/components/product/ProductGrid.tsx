import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Spinner } from '../ui/Spinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
  onSelectProduct: (product: Product) => void;
}

export function ProductGrid({ products, loading, error, onSelectProduct }: ProductGridProps) {
  if (loading) {
    return (
      <div className={styles.center}>
        <Spinner />
        <p className={styles.loadingText}>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>👟</span>
        <p className={styles.emptyTitle}>Sin productos en esta categoría</p>
        <p className={styles.emptyBody}>Prueba seleccionando otra categoría.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
      ))}
    </div>
  );
}
