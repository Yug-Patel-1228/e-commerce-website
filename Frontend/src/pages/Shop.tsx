import { useEffect, useMemo, useState } from 'react';
import { FilterSort, applyFilters, defaultFilters, type Filters } from '../components/product/FilterSort';
import { ProductGrid } from '../components/product/ProductGrid';
import { products } from '../data/products';
import { setSeo } from '../utils/seo';

export function Shop() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [visible, setVisible] = useState(12);
  const filtered = useMemo(() => applyFilters(products, filters), [filters]);

  useEffect(() => {
    setSeo('Shop All | VASIRA', 'Browse all VASIRA demo products with filters and sorting.');
  }, []);

  return (
    <section className="container-page py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Shop</p>
        <h1 className="serif text-6xl md:text-8xl">Shop All</h1>
        <p className="mt-4 leading-8 text-muted">
          Discover sarees, lehengas, kurtas, dresses and modern festive sets from the VASIRA demo catalog.
        </p>
      </div>
      <FilterSort filters={filters} onChange={(next) => { setFilters(next); setVisible(12); }} products={products} />
      <ProductGrid products={filtered.slice(0, visible)} />
      {visible < filtered.length ? (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisible((count) => count + 8)}
            className="border border-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Load More
          </button>
        </div>
      ) : null}
    </section>
  );
}
