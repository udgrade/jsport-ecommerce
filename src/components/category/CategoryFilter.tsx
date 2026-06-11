import type { Category } from '../../types';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: Category[];
  selected: number | null;
  onSelect: (id: number | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.pill} ${selected === null ? styles.pillActive : ''}`}
        onClick={() => onSelect(null)}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.pill} ${selected === cat.id ? styles.pillActive : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
