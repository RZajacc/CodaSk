import {createBrowserRouter, RouterProvider} from 'react-router';

import Home from '../src/pages/home';
import Connect from '../src/pages/connect';
import Contact from '../src/pages/contact';
import About from './pages/about';
import RootLayout from './layouts/RootLayout.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'connect',
          element: <Connect />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
