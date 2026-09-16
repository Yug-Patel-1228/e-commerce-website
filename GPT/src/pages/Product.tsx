import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Accordion } from '../components/common/Accordion';
import { Button } from '../components/common/Button';
import { ProductGallery } from '../components/product/ProductGallery';
import { SizeGuide } from '../components/product/SizeGuide';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductBySlug, products } from '../data/products';
import { formatPrice } from '../utils/format';
import { setSeo } from '../utils/seo';
import { NotFound } from './NotFound';
import { ProductCard } from '../components/product/ProductCard';

export function Product() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const cart = useCart();
  const wishlist = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setSize(product.sizes[0]);
      setColor(product.colors[0]);
      setSeo(`${product.name} | VASIRA`, product.description);
    }
  }, [product]);

  const related = useMemo(
    () => products.filter((item) => item.category === product?.category && item.id !== product.id).slice(0, 4),
    [product],
  );

  if (!product) return <NotFound />;
  const soldOut = product.isSoldOut || product.stock <= 0;

  const add = () => cart.addItem({ productId: product.id, size, color, quantity });

  return (
    <section className="container-page py-10 md:py-14">
      <div className="mb-6 text-xs uppercase tracking-[0.18em] text-muted">
        <Link to="/shop">Shop</Link> / {product.category}
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{product.category}</p>
          <h1 className="serif mt-3 text-5xl leading-tight md:text-7xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-lg">
            <span>{formatPrice(product.price)}</span>
            {product.compareAtPrice ? <span className="text-muted line-through">{formatPrice(product.compareAtPrice)}</span> : null}
          </div>
          <p className="mt-5 leading-8 text-muted">{product.description}</p>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]">Color: {color}</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setColor(option)}
                  className={`min-h-11 border px-4 text-sm ${color === option ? 'border-ink' : 'border-line'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Size: {size}</p>
              <button type="button" onClick={() => setGuideOpen(true)} className="text-xs underline">
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  className={`min-h-11 min-w-12 border px-4 text-sm ${size === option ? 'border-ink bg-ink text-canvas' : 'border-line'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">Qty</span>
            <div className="flex h-11 items-center border border-line">
              <button type="button" className="h-full px-4" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="min-w-10 text-center">{quantity}</span>
              <button type="button" className="h-full px-4" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button onClick={add} disabled={soldOut}>
              {soldOut ? 'Sold Out' : 'Add To Cart'}
            </Button>
            <Button
              variant="secondary"
              disabled={soldOut}
              onClick={() => {
                add();
                navigate('/checkout');
              }}
            >
              Buy Now
            </Button>
          </div>
          <button
            type="button"
            onClick={() => wishlist.toggle(product.id)}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 border border-line text-xs font-semibold uppercase tracking-[0.18em]"
          >
            <Heart size={17} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} /> Wishlist
          </button>

          <div className="mt-6 grid gap-2 text-sm text-muted">
            <p>Complimentary shipping across India.</p>
            <p>Easy 7-day exchange on eligible pieces.</p>
            <p>SKU: {product.sku} • {product.stock > 0 ? `${product.stock} in stock` : 'Unavailable'}</p>
          </div>

          <div className="mt-8">
            <Accordion
              items={[
                { title: 'Description', content: product.description },
                { title: 'Fabric & Details', content: product.fabric },
                { title: 'Size & Fit', content: 'Designed for a relaxed occasion fit. Refer to the size guide for body measurements.' },
                { title: 'Care Instructions', content: product.care },
                { title: 'Shipping', content: 'Demo storefront: shipping estimates are placeholders and can be connected to an API later.' },
                { title: 'Returns', content: 'Demo return policy: exchange within 7 days for unworn pieces with tags intact.' },
              ]}
            />
          </div>
        </div>
      </div>
      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />

      <section className="mt-20">
        <h2 className="serif mb-8 text-4xl">You may also like</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </section>
  );
}
