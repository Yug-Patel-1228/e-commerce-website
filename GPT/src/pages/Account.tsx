import { useEffect, useState } from 'react';
import { Button } from '../components/common/Button';
import { setSeo } from '../utils/seo';

export function Account() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [done, setDone] = useState(false);
  useEffect(() => setSeo('Account | VASIRA', 'Frontend-only VASIRA account demo UI.'), []);

  return (
    <section className="container-page grid gap-10 py-12 md:grid-cols-2 md:items-start">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Account</p>
        <h1 className="serif text-6xl md:text-8xl">Your VASIRA</h1>
        <p className="mt-5 max-w-lg leading-8 text-muted">
          This is a frontend-only account interface. Real authentication can be connected to a backend later.
        </p>
      </div>
      <div className="border border-line bg-sand/40 p-6 md:p-8">
        <div className="mb-6 grid grid-cols-2 border border-line">
          {(['login', 'register'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => { setMode(item); setDone(false); }}
              className={`min-h-11 text-xs font-semibold uppercase tracking-[0.18em] ${mode === item ? 'bg-ink text-canvas' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          {mode === 'register' ? <Input label="Name" type="text" /> : null}
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
          {mode === 'register' ? <Input label="Confirm password" type="password" /> : null}
          {mode === 'login' ? (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
              <button type="button" className="underline">Forgot password?</button>
            </div>
          ) : null}
          <Button>{mode === 'login' ? 'Sign In Demo' : 'Create Demo Account'}</Button>
          {done ? <p className="text-sm text-muted">Demo only: no account was created or authenticated.</p> : null}
        </form>
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
