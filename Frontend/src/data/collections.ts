import type { Collection } from '../types';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const collections: Collection[] = [
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Freshly released silhouettes for celebrations, intimate gatherings and modern rituals.',
    image: img('photo-1509631179647-0177331693ae'),
    filter: (product) => product.collection.includes('new-arrivals'),
  },
  {
    slug: 'sarees',
    title: 'Sarees',
    description: 'Fluid drapes, quiet craft and modern finishing for the Indian wardrobe.',
    image: img('photo-1610189016178-543ecbc8cc1d'),
    filter: (product) => product.category === 'Sarees',
  },
  {
    slug: 'lehengas',
    title: 'Lehengas',
    description: 'Statement lehengas for ceremonies, sangeets and heirloom celebrations.',
    image: img('photo-1600091166971-7f9faad6c1e2'),
    filter: (product) => product.category === 'Lehengas',
  },
  {
    slug: 'kurtas',
    title: 'Kurtas',
    description: 'Refined kurta sets and Anarkalis cut for ease, grace and repeated wear.',
    image: img('photo-1618932260643-eee4a2f652a6'),
    filter: (product) => product.category === 'Kurtas',
  },
  {
    slug: 'dresses',
    title: 'Dresses',
    description: 'Occasion dresses with Indian details, sculptural drapes and soft movement.',
    image: img('photo-1539109136881-3be0616acf4b'),
    filter: (product) => product.category === 'Dresses',
  },
  {
    slug: 'indo-western',
    title: 'Indo-Western',
    description: 'Contemporary sets that carry the romance of Indian dressing into modern evenings.',
    image: img('photo-1595777457583-95e059d581b8'),
    filter: (product) => product.category === 'Indo-Western',
  },
  {
    slug: 'festive-edit',
    title: 'Festive Edit',
    description: 'Our occasion-ready edit of luminous textures, embroideries and celebratory forms.',
    image: img('photo-1524504388940-b1c1722653e1'),
    filter: (product) => product.collection.includes('festive-edit'),
  },
];

export const getCollectionBySlug = (slug: string) =>
  collections.find((collection) => collection.slug === slug);
