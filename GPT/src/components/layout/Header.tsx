import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { MobileMenu } from './MobileMenu';

const nav = [
  ['NEW ARRIVALS', '/collection/new-arrivals'],
  ['SHOP', '/shop'],
  ['SAREES', '/collection/sarees'],
  ['LEHENGAS', '/collection/lehengas'],
  ['KURTAS', '/collection/kurtas'],
  ['DRESSES', '/collection/dresses'],
  ['COLLECTIONS', '/collection/festive-edit'],
  ['ABOUT', '/about'],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition ${
          scrolled ? 'border-line bg-canvas/95 shadow-sm backdrop-blur' : 'border-transparent bg-canvas/80 backdrop-blur'
        }`}
      >
        <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20">
          <nav className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.17em] lg:flex">
            {nav.slice(0, 6).map(([label, href]) => (
              <NavLink key={href} to={href} className={({ isActive }) => (isActive ? 'text-accent' : 'hover:text-accent')}>
                {label}
              </NavLink>
            ))}
          </nav>
          <button type="button" className="p-2 lg:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <Link to="/" className="serif text-3xl font-semibold tracking-[0.22em] md:text-4xl" aria-label="VASIRA home">
            VASIRA
          </Link>
          <div className="flex items-center justify-end gap-1 md:gap-3">
            <Link to="/search" aria-label="Search" className="p-2">
              <Search size={20} />
            </Link>
            <Link to="/account" aria-label="Account" className="hidden p-2 md:block">
              <User size={20} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hidden p-2 md:block">
              <Heart size={20} />
              {wishlist.count ? <span className="absolute right-0 top-0 text-[10px]">{wishlist.count}</span> : null}
            </Link>
            <button type="button" onClick={cart.openCart} aria-label="Open cart" className="relative p-2">
              <ShoppingBag size={20} />
              {cart.count ? <span className="absolute right-0 top-0 text-[10px]">{cart.count}</span> : null}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
