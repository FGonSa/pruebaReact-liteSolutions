import { Product, CATEGORY_LABELS, Category } from '../types/product';
import './ProductCard.css';

type Props = {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  onToggleActive: (product: Product) => void;
};

function ProductCard({ product, onDelete, onEdit, onToggleActive }: Props) {
  const categoryLabel = CATEGORY_LABELS[product.category as Category] ?? product.category;

  return (
    <div className={`product-card ${product.active ? 'active' : 'inactive'}`}>
      <div className="product-card-header">
        <span className="product-category">{categoryLabel}</span>
        <span className={`product-badge ${product.active ? 'badge-active' : 'badge-inactive'}`}>
          {product.active ? 'Activo' : 'Inactivo'}
        </span>
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price.toFixed(2)} €</p>
      <div className="product-card-actions">
        <button className="btn-warning" onClick={() => onEdit(product)}>
          Editar
        </button>
        <button
          className={product.active ? 'btn-secondary' : 'btn-success'}
          onClick={() => onToggleActive(product)}
        >
          {product.active ? 'Desactivar' : 'Activar'}
        </button>
        <button className="btn-danger" onClick={() => onDelete(product.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
