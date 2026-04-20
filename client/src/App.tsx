import {createBrowserRouter, RouterProvider} from 'react-router';

// Layouts
import RootLayout from './layouts/RootLayout.tsx';
import BaseNestedLayout from './layouts/BaseNestedLayout.tsx';

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
import StudentProjects from './pages/discover/studentProjects';
import Polls from './pages/discover/polls';
import Discussions from './pages/discover/discussions';
import Login from './pages/user/login';
import Register from './pages/user/register';
import MoreInfo from './pages/user/moreinfo';
import Profile from './pages/user/profile/userProfile';
import UpdateProfile from './pages/user/profile/updateProfile';
import NotFound from './pages/NotFound.tsx';

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
          element: <BaseNestedLayout />,
          children: [
            {
              path: 'questions',
              element: <BaseNestedLayout />,
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
                  element: <BaseNestedLayout />,
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
                  element: <BaseNestedLayout />,
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
        // Discover routes
        {
          path: 'discover',
          element: <BaseNestedLayout />,
          children: [
            {
              index: false,
              path: 'studentprojects',
              element: <StudentProjects />,
            },
            {
              path: 'polls',
              element: <Polls />,
            },
            {
              path: 'discussions',
              element: <Discussions />,
            },
          ],
        },
        // User routes
        {
          path: 'user',
          element: <BaseNestedLayout />,
          children: [
            {
              index: false,
              path: 'login',
              element: <Login />,
            },
            {
              path: 'register',
              element: <Register />,
            },
            {
              path: 'moreinfo',
              element: <MoreInfo />,
            },
            {
              path: 'profile',
              element: <BaseNestedLayout />,
              children: [
                {
                  index: false,
                  path: ':id',
                  element: <Profile />,
                },
              ],
            },
            {
              path: 'update-profile',
              element: <BaseNestedLayout />,
              children: [
                {
                  index: false,
                  path: ':id',
                  element: <UpdateProfile />,
                },
              ],
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
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
