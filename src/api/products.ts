import { Product, ProductFormData } from '../types/product';
import { MOCK_PRODUCTS } from '../data/mockProducts';

// Simulated in-memory "database"
let db: Product[] = [...MOCK_PRODUCTS];

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () => Math.random().toString(36).slice(2, 9);

export const getProducts = async (): Promise<Product[]> => {
  await delay();
  return [...db];
};

export const createProduct = async (data: ProductFormData): Promise<Product> => {
  await delay(500);
  const newProduct: Product = { id: generateId(), ...data };
  db.push(newProduct);
  return newProduct;
};

export const updateProduct = async (
  id: string,
  data: Partial<ProductFormData>
): Promise<Product> => {
  await delay(400);
  const index = db.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Product ${id} not found`);
  db[index] = { ...db[index], ...data };
  return db[index];
};

export const deleteProduct = async (id: string): Promise<void> => {
  await delay(300);
  const index = db.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Product ${id} not found`);
  db.splice(index, 1);
};
