import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import { Button } from '../common/Button';

export function CartSummary() {
  const cart = useCart();
  const shipping = cart.subtotal > 0 ? 0 : 0;
  const total = cart.subtotal + shipping;
  return (
    <aside className="border border-line bg-sand/40 p-5 md:p-7">
      <h2 className="serif text-3xl">Order Summary</h2>
      <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Discount code
        <div className="mt-2 flex gap-2">
          <input className="min-h-11 flex-1 border border-line bg-canvas px-3" placeholder="VASIRA10" />
          <Button variant="secondary" type="button" className="px-4">
            Apply
          </Button>
        </div>
      </label>
      <div className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-4 text-base font-medium">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      <Link to="/checkout" className="mt-6 block">
        <Button className="w-full" disabled={!cart.items.length}>
          Checkout
        </Button>
      </Link>
      <Link to="/shop" className="mt-3 block text-center text-xs font-semibold uppercase tracking-[0.18em]">
        Continue shopping
      </Link>
    </aside>
  );
}
