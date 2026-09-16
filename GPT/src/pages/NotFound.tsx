import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">404</p>
        <h1 className="serif mt-3 text-6xl md:text-8xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md leading-8 text-muted">The page you are looking for does not exist in this demo storefront.</p>
        <Link to="/" className="mt-8 inline-flex border border-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em]">
          Return home
        </Link>
      </div>
    </section>
  );
}
