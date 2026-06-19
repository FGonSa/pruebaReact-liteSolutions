import { Product } from '../types/product';
import { CATEGORY_LABELS } from '../types/product';
import ProductCard from './ProductCard';
import './ProductList.css';

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  onToggleActive: (product: Product) => void;
};

function ProductList({ products, onDelete, onEdit, onToggleActive }: Props) {
  if (products.length === 0) {
    return <p className="empty-message">No se encontraron productos.</p>;
  }

  return (
    <div>
      <p className="product-count">{products.length} producto(s) encontrado(s)</p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
