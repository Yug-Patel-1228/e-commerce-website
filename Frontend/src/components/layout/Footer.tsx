import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';

const columns = [
  {
    title: 'Shop',
    links: [
      ['New Arrivals', '/collection/new-arrivals'],
      ['Sarees', '/collection/sarees'],
      ['Lehengas', '/collection/lehengas'],
      ['Dresses', '/collection/dresses'],
      ['Kurtas', '/collection/kurtas'],
    ],
  },
  {
    title: 'Help',
    links: [
      ['Contact', '/contact'],
      ['Shipping', '/shipping-policy'],
      ['Returns', '/returns-policy'],
      ['Size Guide', '/product/amira-silk-saree'],
      ['FAQ', '/contact'],
    ],
  },
  {
    title: 'About',
    links: [
      ['Our Story', '/about'],
      ['Designer', '/about'],
      ['Journal', '/about'],
      ['Instagram', siteConfig.instagramUrl],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link to="/" className="serif text-4xl tracking-[0.18em]">
            VASIRA
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            Contemporary Indian fashion shaped by quiet craft, feminine silhouettes and modern occasion dressing.
          </p>
          <a href={siteConfig.instagramUrl} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
            <Instagram size={16} /> Instagram
          </a>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">{column.title}</h3>
              <div className="grid gap-3 text-sm text-muted">
                {column.links.map(([label, href]) =>
                  href.startsWith('http') ? (
                    <a key={href} href={href}>
                      {label}
                    </a>
                  ) : (
                    <Link key={href} to={href}>
                      {label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 VASIRA</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
            <Link to="/returns-policy">Returns Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
