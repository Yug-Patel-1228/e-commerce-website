import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/product/ProductGrid';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { setSeo } from '../utils/seo';

export function Wishlist() {
  const wishlist = useWishlist();
  const wished = products.filter((product) => wishlist.ids.includes(product.id));
  useEffect(() => setSeo('Wishlist | VASIRA', 'Saved VASIRA demo products.'), []);

  return (
    <section className="container-page py-12">
      <h1 className="serif text-6xl md:text-8xl">Wishlist</h1>
      <p className="mt-4 max-w-xl leading-8 text-muted">Your saved pieces are stored locally on this browser.</p>
      <div className="mt-10">
        {wished.length ? (
          <ProductGrid products={wished} />
        ) : (
          <div className="border border-line bg-sand/50 p-12 text-center">
            <h2 className="serif text-4xl">No saved pieces yet</h2>
            <Link to="/shop" className="mt-6 inline-flex border border-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em]">
              Browse shop
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
