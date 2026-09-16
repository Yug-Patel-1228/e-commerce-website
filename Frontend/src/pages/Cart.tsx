import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartLine } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { setSeo } from '../utils/seo';

export function Cart() {
  const cart = useCart();
  useEffect(() => setSeo('Cart | VASIRA', 'Review your VASIRA demo shopping cart.'), []);

  if (!cart.items.length) {
    return (
      <section className="container-page grid min-h-[55vh] place-items-center py-16 text-center">
        <div>
          <h1 className="serif text-6xl">Your cart is empty</h1>
          <p className="mt-4 text-muted">Your selected VASIRA pieces will appear here.</p>
          <Link to="/shop" className="mt-8 inline-flex border border-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em]">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-12">
      <h1 className="serif mb-8 text-6xl md:text-8xl">Cart</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {cart.items.map((item) => (
            <CartLine key={`${item.productId}-${item.color}-${item.size}`} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </section>
  );
}
