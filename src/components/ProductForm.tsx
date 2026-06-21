import { useState, useEffect } from 'react';
import { Product, ProductFormData, CATEGORIES, CATEGORY_LABELS } from '../types/product';
import { createProduct, updateProduct } from '../api/products';
import './ProductForm.css';

type Props = {
  product: Product | null;
  onSaved: (product: Product) => void;
  onCancel: () => void;
};

const EMPTY_FORM: ProductFormData = {
  name: '',
  price: 0,
  category: 'electronics',
  active: true,
};

function ProductForm({ product, onSaved, onCancel }: Props) {
  const [formData, setFormData] = useState<ProductFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        active: product.active,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [product]);

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      setFormError('El nombre es obligatorio');
      return false;
    }

    // Solución Bug 4
    if (!formData.price || formData.price < 0) { // En caso de querer aceptar 0 como precio válido, cambiar la condición
      setFormError('El precio mínimo debe ser superior a 0'); // Corregimos el mensaje 
      return false;
    }

    if (!formData.category) {
      setFormError('La categoría es obligatoria');
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      let saved: Product;
      if (product) {
        saved = await updateProduct(product.id, formData);
      } else {
        saved = await createProduct(formData);
      }
      onSaved(saved);
    } catch {
      setFormError('Error al guardar el producto');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'price'
          ? parseFloat(value)
          : value,
    }));
  };

  return (
    <div className="form-overlay">
      <div className="form-card">
        <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          {formError && <p className="form-error">{formError}</p>}

          <div className="form-field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
            />
          </div>

          <div className="form-field">
            <label htmlFor="price">Precio (€)</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field form-field-checkbox">
            <label>
              <input
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={handleChange}
              />
              Producto activo
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel} disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
