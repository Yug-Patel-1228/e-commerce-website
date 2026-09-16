import { useEffect } from 'react';
import { setSeo } from '../utils/seo';

const content: Record<string, { title: string; text: string[] }> = {
  '/shipping-policy': {
    title: 'Shipping Policy',
    text: ['Complimentary demo shipping across India is displayed for this frontend.', 'Real courier rates and delivery timelines can be connected later.'],
  },
  '/returns-policy': {
    title: 'Returns Policy',
    text: ['Eligible demo products may show a 7-day exchange policy.', 'This is placeholder policy copy and should be replaced before launch.'],
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    text: ['This demo stores cart, wishlist, recent search and newsletter information in localStorage only.', 'No backend, analytics or payment processor is connected.'],
  },
  '/terms': {
    title: 'Terms',
    text: ['VASIRA is a fictional brand used for a frontend demonstration.', 'Replace this copy with legal terms before production use.'],
  },
};

export function Policy({ path }: { path: keyof typeof content }) {
  const page = content[path];
  useEffect(() => setSeo(`${page.title} | VASIRA`, page.text[0]), [page]);
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="serif text-6xl md:text-8xl">{page.title}</h1>
      <div className="mt-8 space-y-5 leading-8 text-muted">
        {page.text.map((item) => <p key={item}>{item}</p>)}
      </div>
    </section>
  );
}
