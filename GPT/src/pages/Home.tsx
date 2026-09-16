import { Instagram, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { LinkButton } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProductCard } from '../components/product/ProductCard';
import { products } from '../data/products';
import { socialImages } from '../data/site';
import { testimonials } from '../data/testimonials';
import { setSeo } from '../utils/seo';
import { useEffect, useState } from 'react';

export function Home() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const newArrivals = products.filter((product) => product.isNew).slice(0, 8);

  useEffect(() => {
    setSeo('VASIRA | Contemporary Indian Fashion', 'Premium demo Indian fashion storefront for VASIRA.');
  }, []);

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    const list = JSON.parse(window.localStorage.getItem('vasira-newsletter') ?? '[]') as string[];
    window.localStorage.setItem('vasira-newsletter', JSON.stringify([...new Set([...list, email])]));
    setJoined(true);
  };

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-ink text-canvas">
        <img
          src="https://images.unsplash.com/photo-1616313253719-c46514cddee1?auto=format&fit=crop&w=1800&q=80"
          alt="VASIRA editorial Indian fashion look"
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
        <motion.div
          className="container-page relative flex min-h-[78vh] items-end pb-16 pt-24 md:pb-24"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em]">New Collection</p>
            <h1 className="serif text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
              The Art of
              <br />
              Indian Craft
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-canvas/85">
              Contemporary silhouettes rooted in timeless Indian craftsmanship.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/collection/new-arrivals">Shop New Arrivals</LinkButton>
              <LinkButton to="/collection/festive-edit" variant="secondary" className="border-canvas text-canvas hover:bg-canvas hover:text-ink">
                Explore Collection
              </LinkButton>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          title="New Arrivals"
          subtitle="Designed for celebrations, occasions and everything in between."
        />
        <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4">
          {newArrivals.map((product) => (
            <div key={product.id} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[23%]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <img
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80"
            alt="Crafted VASIRA occasion wear"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <div className="max-w-xl md:pl-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Designed in India</p>
            <h2 className="serif text-5xl leading-tight md:text-7xl">Quiet craft, modern occasion wear.</h2>
            <p className="mt-6 leading-8 text-muted">
              VASIRA is a fictional designer-led label built for replacement with your real story, imagery and products.
              The interface foregrounds editorial photography, considered spacing and practical e-commerce flows.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading title="What Our Customers Say" />
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {testimonials.map((item) => (
            <article key={item.name} className="border border-line bg-canvas p-6">
              <div className="mb-4 flex text-accent" aria-label={`${item.rating} stars`}>
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm leading-7 text-muted">“{item.review}”</p>
              <p className="mt-5 text-sm font-medium">{item.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <SectionHeading title="Follow The Journey" subtitle="Discover the latest from VASIRA." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
          {socialImages.map((image) => (
            <a key={image} href="https://www.instagram.com/vasira.example" className="group relative aspect-square overflow-hidden bg-sand">
              <img src={image} alt="VASIRA social preview" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-ink/30 text-canvas opacity-0 transition group-hover:opacity-100">
                <Instagram />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="bg-ink px-6 py-14 text-center text-canvas md:px-12">
          <h2 className="serif text-5xl">Join The VASIRA List</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-canvas/75">
            Be the first to discover new collections, private previews and special releases.
          </p>
          <form onSubmit={subscribe} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="min-h-12 flex-1 border border-canvas/30 bg-transparent px-4 text-canvas placeholder:text-canvas/50"
            />
            <button className="min-h-12 bg-canvas px-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              Subscribe
            </button>
          </form>
          {joined ? <p className="mt-4 text-sm text-canvas/75">You are on the list.</p> : null}
        </div>
      </section>
    </>
  );
}
