import { CATEGORIES, CATEGORY_LABELS } from '../types/product';
import './FilterBar.css';

type Props = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showOnlyActive: boolean;
  onToggleActive: () => void;
};

function FilterBar({ selectedCategory, onCategoryChange, showOnlyActive, onToggleActive }: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-filter">Categoría</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Todas</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group filter-checkbox">
        <label>
          <input
            type="checkbox"
            checked={showOnlyActive}
            onChange={onToggleActive}
          />
          Solo activos
        </label>
      </div>
    </div>
  );
}

export default FilterBar;
