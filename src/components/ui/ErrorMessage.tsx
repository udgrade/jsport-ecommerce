import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon}>⚠️</span>
      <div>
        <p className={styles.title}>No se pudieron cargar los datos</p>
        <p className={styles.detail}>{message}</p>
      </div>
    </div>
  );
}
