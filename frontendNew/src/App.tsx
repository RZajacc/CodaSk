import {createBrowserRouter, RouterProvider} from 'react-router';

// Layouts
import RootLayout from './layouts/RootLayout.tsx';
import SearchLayout from './layouts/SearchLayout.tsx';

// Routes
import Home from '../src/pages/home';
import About from './pages/about';
import Contact from '../src/pages/contact';
import Connect from '../src/pages/connect';
import Search from './pages/search/questions';

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
          path: 'search',
          element: <SearchLayout />,
          children: [
            {
              index: false,
              path: 'questions',
              element: <Search />,
            },
          ],
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
