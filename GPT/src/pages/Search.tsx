import { Search as SearchIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ProductGrid } from '../components/product/ProductGrid';
import { products } from '../data/products';
import { setSeo } from '../utils/seo';

export function Search() {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>(() => JSON.parse(window.localStorage.getItem('vasira-recent-searches') ?? '[]'));

  useEffect(() => setSeo('Search | VASIRA', 'Search the VASIRA demo product catalog.'), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((product) =>
      [product.name, product.category, product.description, ...product.tags].join(' ').toLowerCase().includes(q),
    );
  }, [query]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    const next = [q, ...recent.filter((item) => item !== q)].slice(0, 5);
    setRecent(next);
    window.localStorage.setItem('vasira-recent-searches', JSON.stringify(next));
  };

  return (
    <section className="container-page py-12">
      <h1 className="serif text-6xl md:text-8xl">Search</h1>
      <form onSubmit={submit} className="mt-8 flex max-w-3xl border-b border-ink">
        <SearchIcon className="mt-4" size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search sarees, kurtas, silk..."
          className="min-h-14 flex-1 bg-transparent px-4 text-xl outline-none"
          autoFocus
        />
      </form>
      {recent.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {recent.map((term) => (
            <button key={term} type="button" onClick={() => setQuery(term)} className="border border-line px-3 py-2 text-xs uppercase tracking-[0.16em]">
              {term}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-10">
        {query.trim() ? (
          <>
            <p className="mb-6 text-sm text-muted">Search results for “{query}”</p>
            <ProductGrid products={results} />
          </>
        ) : (
          <p className="text-muted">Start typing to search the local product catalog.</p>
        )}
      </div>
    </section>
  );
}
