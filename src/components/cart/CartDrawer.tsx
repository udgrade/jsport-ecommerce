import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

const PLACEHOLDER = 'https://placehold.co/80x80/1C1F2B/F97316?text=JSP';

export function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, removeItem, updateQuantity, clearCart, closeCart } =
    useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={closeCart} aria-hidden="true" />}

      {/* Drawer */}
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ''}`} aria-label="Carrito de compras">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.cartIcon}>🛒</span>
            <h2 className={styles.title}>Carrito</h2>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛍️</span>
              <p className={styles.emptyTitle}>Tu carrito está vacío</p>
              <p className={styles.emptyBody}>Agrega productos para continuar</p>
            </div>
          ) : (
            <ul className={styles.list}>
              {items.map(({ product, quantity }) => {
                const imgSrc =
                  product.images?.find((i) => i.isPrimary || i.primary)?.url ??
                  product.images?.[0]?.url ??
                  PLACEHOLDER;

                return (
                  <li key={product.id} className={styles.item}>
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className={styles.itemImg}
                      onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                    />
                    <div className={styles.itemInfo}>
                      {product.brand && (
                        <span className={styles.itemBrand}>{product.brand}</span>
                      )}
                      <p className={styles.itemName}>{product.name}</p>
                      <p className={styles.itemPrice}>
                        ${product.price.toLocaleString('es-CO')}
                      </p>
                      {/* Qty controls */}
                      <div className={styles.qtyRow}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className={styles.qty}>{quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeItem(product.id)}
                          aria-label="Eliminar producto"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                    <p className={styles.itemSubtotal}>
                      ${(product.price * quantity).toLocaleString('es-CO')}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>${totalPrice.toLocaleString('es-CO')}</span>
            </div>
            <button className={styles.checkoutBtn}>
              Proceder al pago
            </button>
            <button className={styles.clearBtn} onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
