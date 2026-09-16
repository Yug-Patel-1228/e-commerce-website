import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collections } from '../../data/collections';

const links = [
  ['New Arrivals', '/collection/new-arrivals'],
  ['Shop', '/shop'],
  ['Sarees', '/collection/sarees'],
  ['Lehengas', '/collection/lehengas'],
  ['Kurtas', '/collection/kurtas'],
  ['Dresses', '/collection/dresses'],
  ['Collections', '/collection/festive-edit'],
  ['About', '/about'],
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 bg-canvas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Link to="/" onClick={onClose} className="serif text-3xl tracking-[0.18em]">
              VASIRA
            </Link>
            <button type="button" aria-label="Close navigation" onClick={onClose} className="p-2">
              <X size={22} />
            </button>
          </div>
          <nav className="px-5 py-8" aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                to={href}
                onClick={onClose}
                className="serif block border-b border-line py-4 text-4xl"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Explore edits</p>
            <div className="flex flex-wrap gap-2">
              {collections.map((collection) => (
                <Link
                  key={collection.slug}
                  to={`/collection/${collection.slug}`}
                  onClick={onClose}
                  className="border border-line px-3 py-2 text-xs uppercase tracking-[0.16em]"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
