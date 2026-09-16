import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { setSeo } from '../utils/seo';

const steps = ['Contact', 'Shipping address', 'Delivery method', 'Payment placeholder', 'Order review'];
const methods = ['UPI', 'Credit/Debit Card', 'Net Banking', 'Cash on Delivery'];

export function Checkout() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  useEffect(() => setSeo('Checkout Demo | VASIRA', 'Frontend-only VASIRA checkout demo.'), []);

  if (success) {
    return (
      <section className="container-page grid min-h-[60vh] place-items-center py-16 text-center">
        <div>
          <CheckCircle2 className="mx-auto text-accent" size={54} />
          <h1 className="serif mt-5 text-6xl">Demo order placed</h1>
          <p className="mx-auto mt-4 max-w-lg leading-8 text-muted">
            No payment was processed. This success state is ready for a future checkout integration.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-12">
      <h1 className="serif text-6xl md:text-8xl">Checkout</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="border border-line bg-canvas p-5 md:p-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {steps.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                className={`border px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${step === index ? 'border-ink bg-ink text-canvas' : 'border-line'}`}
              >
                {index + 1}. {label}
              </button>
            ))}
          </div>
          <form className="grid gap-4">
            {step === 0 ? <Input label="Email" type="email" /> : null}
            {step === 1 ? (
              <>
                <Input label="Full name" type="text" />
                <Input label="Phone" type="tel" />
                <Input label="Address" type="text" />
                <div className="grid gap-4 sm:grid-cols-2"><Input label="City" type="text" /><Input label="PIN code" type="text" /></div>
              </>
            ) : null}
            {step === 2 ? (
              <div className="grid gap-3">
                {['Standard delivery - Free', 'Express delivery - Demo only'].map((method) => (
                  <label key={method} className="flex items-center gap-3 border border-line p-4"><input name="delivery" type="radio" defaultChecked={method.startsWith('Standard')} /> {method}</label>
                ))}
              </div>
            ) : null}
            {step === 3 ? (
              <div className="grid gap-3">
                {methods.map((method) => (
                  <label key={method} className="flex items-center gap-3 border border-line p-4"><input name="payment" type="radio" /> {method}</label>
                ))}
                <p className="text-sm text-muted">Payment UI is a placeholder. Razorpay, Shopify or another provider can be integrated later.</p>
              </div>
            ) : null}
            {step === 4 ? <p className="leading-8 text-muted">Review your cart and place this frontend-only demo order.</p> : null}
            <div className="mt-4 flex gap-3">
              {step > 0 ? <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>Back</Button> : null}
              {step < steps.length - 1 ? (
                <Button type="button" onClick={() => setStep((s) => s + 1)}>Continue</Button>
              ) : (
                <Button type="button" onClick={() => { cart.clearCart(); setSuccess(true); }}>Place Order — Demo</Button>
              )}
            </div>
          </form>
        </div>
        <aside className="border border-line bg-sand/40 p-6">
          <h2 className="serif text-3xl">Order Review</h2>
          <div className="mt-5 space-y-3 text-sm">
            {cart.items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between gap-4">
                <span>{item.quantity} × {item.productId}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-line pt-4 font-medium">
              <span>Total</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Input({ label, type }: { label: string; type: string }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
      {label}
      <input required type={type} className="mt-2 min-h-12 w-full border border-line bg-canvas px-3 text-base normal-case tracking-normal text-ink" />
    </label>
  );
}
