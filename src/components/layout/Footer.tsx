import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="nosotros" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Jsport" className={styles.logoImg} />
          <span className={styles.logoFire}>J</span>
          <span className={styles.logoText}>SPORT</span>
        </div>
        <p className={styles.tagline}>
          Zapatillas de alto rendimiento desde 2017. <br />
          Cali, Colombia — para quienes viven en movimiento.
        </p>
        <p className={styles.copy}>© {new Date().getFullYear()} Jsport Zapatillas. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
