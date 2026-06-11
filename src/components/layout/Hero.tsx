import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      {/* Ambient glow orbs */}
      <div className={styles.orbFire} aria-hidden="true" />
      <div className={styles.orbElectric} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>Nueva colección 2025</p>
        <h1 className={styles.headline}>
          <span className={styles.headlineFire}>DOMINA</span>
          <br />
          CADA PASO
        </h1>
        <p className={styles.body}>
          Zapatillas de alto rendimiento para quienes no se conforman con lo ordinario.
          Estilo, durabilidad y actitud en cada par.
        </p>
        <div className={styles.ctas}>
          <a href="#productos" className={styles.ctaPrimary}>
            Ver catálogo
          </a>
          <a href="#nosotros" className={styles.ctaSecondary}>
            Nuestra historia
          </a>
        </div>
      </div>

      {/* Decorative logo pulsing */}
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.shoeGlow} />
        <img
          src="/logo.png"
          alt="Jsport"
          className={styles.logoHero}
        />
        <div className={styles.badge}>
          <span className={styles.badgeYear}>2017</span>
          <span className={styles.badgeLabel}>AÑOS DE PASIÓN</span>
        </div>
      </div>
    </section>
  );
}
