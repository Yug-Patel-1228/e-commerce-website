import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProductById } from '../../data/products';
import type { CartItem as CartItemType } from '../../types';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export function CartLine({ item, compact = false }: { item: CartItemType; compact?: boolean }) {
  const product = getProductById(item.productId);
  const cart = useCart();
  if (!product) return null;

  return (
    <div className="grid grid-cols-[82px_1fr] gap-4 border-b border-line py-5">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden bg-sand">
        <img src={product.images[0]} alt={product.name} className="aspect-[3/4] h-full w-full object-cover" />
      </Link>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/product/${product.slug}`} className="font-medium">
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-muted">
              {item.color} / {item.size}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${product.name}`}
            onClick={() => cart.removeItem(item.productId, item.size, item.color)}
            className="p-1 text-muted hover:text-ink"
          >
            <X size={17} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex h-10 items-center border border-line">
            <button
              type="button"
              className="h-full px-3"
              aria-label={`Decrease quantity for ${product.name}`}
              onClick={() => cart.updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
            >
              -
            </button>
            <span className="min-w-8 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              className="h-full px-3"
              aria-label={`Increase quantity for ${product.name}`}
              onClick={() => cart.updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <p className={compact ? 'text-sm' : 'font-medium'}>{formatPrice(product.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
