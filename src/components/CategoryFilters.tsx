import { motion } from 'motion/react';
import { courseCategories, type CategoryFilter } from '../types/course';

interface CategoryFiltersProps {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}

const categories: CategoryFilter[] = ['All Workshops', ...courseCategories];

export function CategoryFilters({ value, onChange }: CategoryFiltersProps) {
  return (
    <div className="filter-group" aria-labelledby="category-filter-label">
      <p id="category-filter-label" className="filter-label">
        Category
      </p>
      <div className="filter-scroll" role="group" aria-label="Workshop category">
        {categories.map((category) => {
          const active = value === category;
          return (
            <button
              key={category}
              type="button"
              className="filter-chip"
              aria-pressed={active}
              onClick={() => onChange(category)}
            >
              {active && (
                <motion.span
                  className="filter-chip-active"
                  layoutId="active-category"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
