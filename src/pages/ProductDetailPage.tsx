import { useState, useMemo } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Spinner } from '../components/ui/Spinner';
import styles from './ProductDetailPage.module.css';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const PLACEHOLDER = 'https://placehold.co/600x600/1C1F2B/F97316?text=JSPORT';

export function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  const { addItem } = useCart();

  const images = useMemo(() => {
    if (!product.images || product.images.length === 0) return [{ id: 0, url: PLACEHOLDER, isPrimary: true, primary: true }];
    // Primary image first
    return [...product.images].sort((a, b) => (b.isPrimary || b.primary ? 1 : 0) - (a.isPrimary || a.primary ? 1 : 0));
  }, [product.images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activeSrc = imgError ? PLACEHOLDER : images[activeIndex]?.url ?? PLACEHOLDER;

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleQty(delta: number) {
    setQuantity((q) => Math.max(1, Math.min(product.stock ?? 99, q + delta)));
  }

  const hasDiscount = product.base_price && product.base_price > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.base_price!) * 100)
    : 0;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Volver al catálogo
        </button>
        {product.category && (
          <>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCat}>{product.category.name}</span>
          </>
        )}
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbName}>{product.name}</span>
      </div>

      <div className={styles.layout}>
        {/* ── Gallery ─────────────────────────────────────────── */}
        <div className={styles.gallery}>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  className={`${styles.thumb} ${idx === activeIndex ? styles.thumbActive : ''}`}
                  onClick={() => { setActiveIndex(idx); setImgError(false); }}
                  aria-label={`Imagen ${idx + 1}`}
                >
                  <img
                    src={img.url}
                    alt=""
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className={styles.mainImgWrapper}>
            {hasDiscount && (
              <div className={styles.discountBadge}>-{discountPct}%</div>
            )}
            <img
              key={activeIndex}
              src={activeSrc}
              alt={product.name}
              className={styles.mainImg}
              onError={() => setImgError(true)}
            />
            {/* Dot indicators on mobile */}
            {images.length > 1 && (
              <div className={styles.dots}>
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ''}`}
                    onClick={() => { setActiveIndex(idx); setImgError(false); }}
                    aria-label={`Imagen ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Info ────────────────────────────────────────────── */}
        <div className={styles.info}>
          {/* Category + Brand */}
          <div className={styles.tags}>
            {product.category && (
              <span className={styles.tagCategory}>{product.category.name}</span>
            )}
            {product.brand && (
              <span className={styles.tagBrand}>{product.brand}</span>
            )}
          </div>

          <h1 className={styles.name}>{product.name}</h1>

          {/* Pricing */}
          <div className={styles.pricing}>
            <span className={styles.price}>${product.price.toLocaleString('es-CO')}</span>
            {hasDiscount && (
              <span className={styles.basePrice}>${product.base_price!.toLocaleString('es-CO')}</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className={styles.description}>{product.description}</p>
          )}

          {/* Stock */}
          <div className={styles.stockRow}>
            <span className={`${styles.stockDot} ${(product.stock ?? 1) > 0 ? styles.inStock : styles.outStock}`} />
            <span className={styles.stockLabel}>
              {(product.stock ?? 1) > 0
                ? `${product.stock ?? 'Disponible'} en stock`
                : 'Sin stock'}
            </span>
          </div>

          <div className={styles.divider} />

          {/* Quantity + Add to cart */}
          {(product.stock ?? 1) > 0 && (
            <>
              <div className={styles.qtySection}>
                <span className={styles.qtyLabel}>Cantidad</span>
                <div className={styles.qtyControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQty(-1)}
                    disabled={quantity <= 1}
                    aria-label="Reducir"
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQty(1)}
                    disabled={quantity >= (product.stock ?? 99)}
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
                  onClick={handleAddToCart}
                >
                  {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
                </button>
              </div>
            </>
          )}

          {/* Extra info */}
          <div className={styles.metaList}>
            {product.brand && (
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Marca</span>
                <span className={styles.metaVal}>{product.brand}</span>
              </div>
            )}
            {product.category && (
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Categoría</span>
                <span className={styles.metaVal}>{product.category.name}</span>
              </div>
            )}
            {product.id && (
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>SKU</span>
                <span className={styles.metaVal}>JSP-{String(product.id).padStart(4, '0')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
