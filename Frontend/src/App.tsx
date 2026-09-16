import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { About } from './pages/About';
import { Account } from './pages/Account';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Collection } from './pages/Collection';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Policy } from './pages/Policy';
import { Product } from './pages/Product';
import { Search } from './pages/Search';
import { Shop } from './pages/Shop';
import { Wishlist } from './pages/Wishlist';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/collection/:slug', element: <Collection /> },
      { path: '/product/:slug', element: <Product /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/search', element: <Search /> },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/account', element: <Account /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/shipping-policy', element: <Policy path="/shipping-policy" /> },
      { path: '/returns-policy', element: <Policy path="/returns-policy" /> },
      { path: '/privacy-policy', element: <Policy path="/privacy-policy" /> },
      { path: '/terms', element: <Policy path="/terms" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
