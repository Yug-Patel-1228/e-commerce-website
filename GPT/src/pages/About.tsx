import { useEffect } from 'react';
import { setSeo } from '../utils/seo';

export function About() {
  useEffect(() => setSeo('About | VASIRA', 'The fictional VASIRA designer story and craftsmanship page.'), []);
  return (
    <section>
      <div className="relative h-[55vh] bg-ink text-canvas">
        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=80" alt="VASIRA designer story" className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="container-page relative flex h-full items-end pb-12">
          <h1 className="serif max-w-3xl text-6xl leading-none md:text-8xl">Designed in India, crafted with intention.</h1>
        </div>
      </div>
      <div className="container-page grid gap-12 py-20 md:grid-cols-2">
        {[
          ['Our Story', 'VASIRA is a fictional premium Indian fashion label created for this frontend. The copy is intentionally original and easy to replace.'],
          ['Crafted With Intention', 'Every demo piece is presented with a focus on fabric, fit, care and modern occasion styling.'],
          ['Designer-Led', 'The experience is shaped around a fashion designer’s point of view: restraint, detail and editorial clarity.'],
          ['Indian Heritage, Modern Ease', 'The aesthetic references Indian craft and ceremonial dressing without copying any reference brand assets.'],
        ].map(([title, text]) => (
          <article key={title} className="border-t border-line pt-6">
            <h2 className="serif text-4xl">{title}</h2>
            <p className="mt-4 leading-8 text-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
