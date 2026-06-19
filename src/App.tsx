import { useState, useEffect } from 'react';
import { Product } from './types/product';
import { getProducts, deleteProduct, updateProduct } from './api/products';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      const index = products.findIndex((p) => p.id === id);
      products.splice(index, 1);
      setProducts(products);
    } catch {
      setError('Error al eliminar el producto');
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const updated = await updateProduct(product.id, { active: !product.active });
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    } catch {
      setError('Error al actualizar el producto');
    }
  };

  const handleProductSaved = (product: Product) => {
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const filteredProducts = products
    .filter((p) =>
      selectedCategory === 'all' ? true : p.category === selectedCategory
    )
    .filter((p) => (showOnlyActive ? p.active || true : true));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestión de Productos</h1>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditingProduct(null); }}>
          + Nuevo Producto
        </button>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showOnlyActive={showOnlyActive}
        onToggleActive={() => setShowOnlyActive((v) => !v)}
      />

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSaved={handleProductSaved}
          onCancel={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}

      {loading ? (
        <p className="loading">Cargando productos...</p>
      ) : (
        <ProductList
          products={filteredProducts}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
}

export default App;
