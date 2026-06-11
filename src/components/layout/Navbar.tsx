import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  onCategorySelect: (id: number | null) => void;
  selectedCategory: number | null;
  categoryCount: number;
  onLogoClick: () => void;
}

export function Navbar({ onCategorySelect, selectedCategory, categoryCount, onLogoClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo — clickable to go home */}
        <button className={styles.logo} onClick={onLogoClick} aria-label="Ir al inicio">
          <img src="/logo.png" alt="Jsport" className={styles.logoImg} />
          <span className={styles.logoFire}>J</span>
          <span className={styles.logoText}>SPORT</span>
          <span className={styles.logoBadge}>ZPT</span>
        </button>

        {/* Desktop links */}
        <ul className={styles.links}>
          <li>
            <button
              className={`${styles.link} ${selectedCategory === null ? styles.linkActive : ''}`}
              onClick={() => onCategorySelect(null)}
            >
              Todo
            </button>
          </li>
          <li><a href="#productos" className={styles.link}>Catálogo</a></li>
          <li><a href="#nosotros" className={styles.link}>Nosotros</a></li>
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <span className={styles.tagline}>SINCE 2017</span>

          {/* Cart button */}
          <button className={styles.cartBtn} onClick={openCart} aria-label="Ver carrito">
            🛒
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </button>

          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button className={styles.mobileLink} onClick={() => { onCategorySelect(null); setMenuOpen(false); }}>
            Todo ({categoryCount})
          </button>
          <a href="#productos" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Catálogo</a>
          <a href="#nosotros" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Nosotros</a>
        </div>
      )}
    </header>
  );
}
