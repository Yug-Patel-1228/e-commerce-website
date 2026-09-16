import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type Item = {
  title: string;
  content: ReactNode;
};

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <div key={item.title}>
          <button
            type="button"
            className="flex w-full items-center justify-between py-5 text-left text-xs font-semibold uppercase tracking-[0.18em]"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            {item.title}
            <ChevronDown className={`transition ${open === index ? 'rotate-180' : ''}`} size={18} />
          </button>
          <div
            className={`grid transition-all duration-300 ${
              open === index ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden text-sm leading-7 text-muted">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
