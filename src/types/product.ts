export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  active: boolean;
};

export type ProductFormData = Omit<Product, 'id'>;

export type Category = 'electronics' | 'clothing' | 'food' | 'sports' | 'books';

export const CATEGORIES: Category[] = ['electronics', 'clothing', 'food', 'sports', 'books'];

export const CATEGORY_LABELS: Record<Category, string> = {
  electronics: 'Electrónica',
  clothing: 'Ropa',
  food: 'Alimentación',
  sports: 'Deportes',
  books: 'Libros',
};
