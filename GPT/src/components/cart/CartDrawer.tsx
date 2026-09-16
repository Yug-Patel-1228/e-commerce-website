import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import { Button } from '../common/Button';
import { CartLine } from './CartItem';

export function CartDrawer() {
  const cart = useCart();

  return (
    <AnimatePresence>
      {cart.isCartOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={cart.closeCart}
        >
          <motion.aside
            className="ml-auto flex h-full w-full max-w-md flex-col bg-canvas shadow-soft"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onMouseDown={(event) => event.stopPropagation()}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line p-5">
              <h2 className="serif text-3xl">Cart</h2>
              <button type="button" aria-label="Close cart" onClick={cart.closeCart} className="p-2">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto px-5">
              {cart.items.length ? (
                cart.items.map((item) => (
                  <CartLine
                    key={`${item.productId}-${item.color}-${item.size}`}
                    item={item}
                    compact
                  />
                ))
              ) : (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <h3 className="serif text-3xl">Your cart is quiet</h3>
                    <p className="mt-2 text-sm text-muted">Add a piece you love and it will appear here.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-line p-5">
              <div className="mb-2 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-muted">Taxes and shipping calculated at checkout.</p>
              <div className="grid gap-3">
                <Link to="/cart" onClick={cart.closeCart}>
                  <Button variant="secondary" className="w-full">
                    View Cart
                  </Button>
                </Link>
                <Link to="/checkout" onClick={cart.closeCart}>
                  <Button className="w-full" disabled={!cart.items.length}>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
