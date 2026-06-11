import { useState } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const PLACEHOLDER_URL = 'https://placehold.co/400x400/1C1F2B/F97316?text=JSPORT';

function getPrimaryImage(product: Product): string {
  if (!product.images || product.images.length === 0) return PLACEHOLDER_URL;
  const primary = product.images.find((img) => img.isPrimary || img.primary);
  return primary?.url ?? product.images[0].url;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  const imageSrc = imgError ? PLACEHOLDER_URL : getPrimaryImage(product);
  const categoryName = product.category?.name;

  function handleAddClick(e: React.MouseEvent) {
    e.stopPropagation(); // prevent opening detail
    addItem(product, 1);
  }

  return (
    <article className={styles.card} onClick={() => onSelect(product)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={product.name}
          className={styles.image}
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {categoryName && (
          <span className={styles.categoryBadge}>{categoryName}</span>
        )}
        {product.stock !== undefined && product.stock === 0 && (
          <div className={styles.outOfStock}>Sin stock</div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        {product.brand && (
          <span className={styles.brand}>{product.brand}</span>
        )}
        <h3 className={styles.name}>{product.name}</h3>
        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>
              ${product.price.toLocaleString('es-CO')}
            </span>
            {product.base_price && product.base_price !== product.price && (
              <span className={styles.basePrice}>
                ${product.base_price.toLocaleString('es-CO')}
              </span>
            )}
          </div>
          <button
            className={styles.addBtn}
            onClick={handleAddClick}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
