import { useState } from 'react';

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-4 md:grid-cols-[88px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            onClick={() => setActive(index)}
            aria-label={`View image ${index + 1} for ${name}`}
            className={`h-20 w-16 shrink-0 overflow-hidden border ${
              active === index ? 'border-ink' : 'border-transparent'
            }`}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="order-1 overflow-hidden bg-sand md:order-2">
        <img
          src={images[active]}
          alt={name}
          className="aspect-[3/4] h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
