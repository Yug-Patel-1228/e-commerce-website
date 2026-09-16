import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { getProductById } from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartItem } from '../types';

type AddCartInput = {
  productId: string;
  size: string;
  color: string;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddCartInput) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const sameVariant = (item: CartItem, productId: string, size: string, color: string) =>
  item.productId === productId && item.size === size && item.color === color;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('vasira-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const addItem = ({ productId, size, color, quantity = 1 }: AddCartInput) => {
      setItems((current) => {
        const existing = current.find((item) => sameVariant(item, productId, size, color));
        if (existing) {
          return current.map((item) =>
            sameVariant(item, productId, size, color)
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...current, { productId, size, color, quantity }];
      });
      setIsCartOpen(true);
    };

    const removeItem = (productId: string, size: string, color: string) => {
      setItems((current) => current.filter((item) => !sameVariant(item, productId, size, color)));
    };

    const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      setItems((current) =>
        current.map((item) =>
          sameVariant(item, productId, size, color) ? { ...item, quantity } : item,
        ),
      );
    };

    const subtotal = items.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
      items,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      clearCart: () => setItems([]),
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal,
    };
  }, [isCartOpen, items, setItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
