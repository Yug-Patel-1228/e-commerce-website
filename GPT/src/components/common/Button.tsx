import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

const styles: Record<Variant, string> = {
  primary: 'bg-ink text-canvas hover:bg-accent',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-canvas',
  ghost: 'text-ink hover:text-accent',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  variant?: Variant;
  children: ReactNode;
};

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition disabled:pointer-events-none disabled:opacity-50';

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ to, variant = 'primary', className = '', children, ...props }: LinkButtonProps) {
  return (
    <Link to={to} className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
