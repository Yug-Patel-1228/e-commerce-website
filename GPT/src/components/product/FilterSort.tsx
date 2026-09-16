import type { Product } from '../../types';

export type Filters = {
  category: string;
  size: string;
  color: string;
  price: string;
  availability: string;
  sort: string;
};

const categories = ['All', 'Sarees', 'Lehengas', 'Kurtas', 'Dresses', 'Indo-Western'];
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const priceRanges = ['All', 'Under 10000', '10000-20000', '20000-35000', 'Above 35000'];
const availability = ['All', 'In stock', 'Sold out'];
const sorts = ['Featured', 'Newest', 'Price low to high', 'Price high to low'];

export const defaultFilters: Filters = {
  category: 'All',
  size: 'All',
  color: 'All',
  price: 'All',
  availability: 'All',
  sort: 'Featured',
};

export const applyFilters = (items: Product[], filters: Filters) => {
  const filtered = items.filter((product) => {
    const inPrice =
      filters.price === 'All' ||
      (filters.price === 'Under 10000' && product.price < 10000) ||
      (filters.price === '10000-20000' && product.price >= 10000 && product.price <= 20000) ||
      (filters.price === '20000-35000' && product.price > 20000 && product.price <= 35000) ||
      (filters.price === 'Above 35000' && product.price > 35000);

    return (
      (filters.category === 'All' || product.category === filters.category) &&
      (filters.size === 'All' || product.sizes.includes(filters.size)) &&
      (filters.color === 'All' || product.colors.includes(filters.color)) &&
      (filters.availability === 'All' ||
        (filters.availability === 'In stock' ? product.stock > 0 : product.stock <= 0)) &&
      inPrice
    );
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === 'Newest') return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    if (filters.sort === 'Price low to high') return a.price - b.price;
    if (filters.sort === 'Price high to low') return b.price - a.price;
    return 0;
  });
};

export function FilterSort({
  filters,
  onChange,
  products,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  products: Product[];
}) {
  const colors = ['All', ...Array.from(new Set(products.flatMap((product) => product.colors)))];
  const field = (key: keyof Filters, options: string[], label: string) => (
    <label className="flex min-w-0 flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
      {label}
      <select
        value={filters[key]}
        onChange={(event) => onChange({ ...filters, [key]: event.target.value })}
        className="min-h-11 border border-line bg-canvas px-3 text-sm normal-case tracking-0 text-ink"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="mb-8 grid gap-3 border-y border-line py-5 sm:grid-cols-2 lg:grid-cols-6">
      {field('category', categories, 'Category')}
      {field('size', sizes, 'Size')}
      {field('color', colors, 'Color')}
      {field('price', priceRanges, 'Price')}
      {field('availability', availability, 'Availability')}
      {field('sort', sorts, 'Sort')}
    </div>
  );
}
