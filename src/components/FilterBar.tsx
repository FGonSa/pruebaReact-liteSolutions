import { CATEGORIES, CATEGORY_LABELS } from '../types/product';
import './FilterBar.css';

type Props = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showOnlyActive: boolean;
  onToggleActive: () => void;
  onSearchChange: (search: string) => void; // Nueva prop para manejar el cambio en la búsqueda
  searchProduct: string; // Nueva prop para el valor de búsqueda
};

function FilterBar({ selectedCategory, onCategoryChange, showOnlyActive, onToggleActive, onSearchChange, searchProduct }: Props) {
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

          {/* !-- NUEVO FILTRO: Búsqueda por nombre --> */}
      <div className="filter-group">
        <label htmlFor="search-filter">Buscar</label>
        <input
          id="search-filter"
          type="text"
          placeholder="Buscar producto..."
          value={searchProduct}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FilterBar;
