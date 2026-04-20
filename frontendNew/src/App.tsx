import {createBrowserRouter, RouterProvider} from 'react-router';

// Layouts
import RootLayout from './layouts/RootLayout.tsx';
import SearchLayout from './layouts/SearchLayout.tsx';

// Routes
import Home from '../src/pages/home';
import About from './pages/about';
import Contact from '../src/pages/contact';
import Connect from '../src/pages/connect';
import QuestionsList from './pages/search/questions';
import TaggedQuestions from './pages/search/questions/taggedQuestions';
import QuestionDetails from './pages/search/questions/questionDetails';
import AskQuestion from './pages/search/questions/askQuestion';
import UpdateQuestion from './pages/search/questions/updateQuestion';
import Tags from './pages/search/tags';
import Modules from './pages/search/modules';

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
        // SearchBy routes
        {
          path: 'search',
          element: <SearchLayout />,
          children: [
            {
              path: 'questions',
              element: <SearchLayout />,
              children: [
                {
                  index: true,
                  element: <QuestionsList />,
                },
                {
                  path: 'askQuestion',
                  element: <AskQuestion />,
                },
                {
                  path: 'tagged',
                  element: <SearchLayout />,
                  children: [
                    {
                      index: false,
                      path: ':id',
                      element: <TaggedQuestions />,
                    },
                  ],
                },
                {
                  path: 'updateQuestion',
                  element: <SearchLayout />,
                  children: [
                    {
                      index: false,
                      path: ':id',
                      element: <UpdateQuestion />,
                    },
                  ],
                },
                {
                  path: ':id',
                  element: <QuestionDetails />,
                },
              ],
            },
            {
              path: 'tags',
              element: <Tags />,
            },
            {
              path: 'modules',
              element: <Modules />,
            },
          ],
        },

        // Other routes
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
