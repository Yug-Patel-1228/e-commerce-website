import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/format';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const cart = useCart();
  const wished = wishlist.has(product.id);
  const disabled = product.isSoldOut || product.stock <= 0;

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          {product.images[1] ? (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
            />
          ) : null}
        </Link>
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isNew ? <span className="bg-canvas px-2 py-1 text-[10px] uppercase tracking-[0.16em]">New</span> : null}
          {product.isSale ? <span className="bg-accent px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white">Sale</span> : null}
          {disabled ? <span className="bg-ink px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white">Sold</span> : null}
        </div>
        <motion.button
          type="button"
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={() => wishlist.toggle(product.id)}
          whileTap={{ scale: 0.88 }}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-canvas/90 shadow-sm transition hover:text-accent md:opacity-0 md:group-hover:opacity-100"
        >
          <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
        </motion.button>
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            cart.addItem({
              productId: product.id,
              size: product.sizes[0],
              color: product.colors[0],
              quantity: 1,
            })
          }
          className="absolute inset-x-3 bottom-3 hidden min-h-11 items-center justify-center gap-2 bg-canvas text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-ink hover:text-canvas disabled:opacity-60 md:flex md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <ShoppingBag size={16} /> Quick Add
        </button>
      </div>
      <Link to={`/product/${product.slug}`} className="mt-4 block">
        <p className="text-sm font-medium">{product.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{product.category}</p>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span>{formatPrice(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          ) : null}
        </div>
      </Link>
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          cart.addItem({
            productId: product.id,
            size: product.sizes[0],
            color: product.colors[0],
            quantity: 1,
          })
        }
        className="mt-3 flex w-full items-center justify-center gap-2 border border-line py-3 text-xs font-semibold uppercase tracking-[0.18em] md:hidden"
      >
        <ShoppingBag size={15} /> Quick Add
      </button>
    </article>
  );
}
