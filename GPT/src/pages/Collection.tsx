import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FilterSort, applyFilters, defaultFilters, type Filters } from '../components/product/FilterSort';
import { ProductGrid } from '../components/product/ProductGrid';
import { getCollectionBySlug } from '../data/collections';
import { products } from '../data/products';
import { setSeo } from '../utils/seo';
import { NotFound } from './NotFound';

export function Collection() {
  const { slug = '' } = useParams();
  const collection = getCollectionBySlug(slug);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const collectionProducts = useMemo(
    () => (collection ? products.filter(collection.filter) : []),
    [collection],
  );
  const filtered = useMemo(() => applyFilters(collectionProducts, filters), [collectionProducts, filters]);

  useEffect(() => {
    if (collection) {
      setSeo(`${collection.title} | VASIRA`, collection.description);
    }
  }, [collection]);

  if (!collection) return <NotFound />;

  return (
    <section>
      <div className="relative h-[44vh] min-h-[360px] bg-ink text-canvas">
        <img src={collection.image} alt={collection.title} className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="container-page relative flex h-full items-end pb-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]">Collection</p>
            <h1 className="serif text-6xl md:text-8xl">{collection.title}</h1>
            <p className="mt-4 leading-8 text-canvas/85">{collection.description}</p>
          </div>
        </div>
      </div>
      <div className="container-page py-12">
        <FilterSort filters={filters} onChange={setFilters} products={collectionProducts} />
        <ProductGrid products={filtered} />
      </div>
    </section>
  );
}
