export type Category = 'Sarees' | 'Lehengas' | 'Kurtas' | 'Dresses' | 'Indo-Western';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  collection: string[];
  images: string[];
  colors: string[];
  sizes: string[];
  fabric: string;
  care: string;
  sku: string;
  stock: number;
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
  isSoldOut?: boolean;
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: string;
  filter: (product: Product) => boolean;
};

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};
