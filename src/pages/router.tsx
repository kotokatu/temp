import { TVShowDetails } from 'entities/tv-show-details';
import { tvShowDetailsLoader } from 'entities/tv-show-details/api/tv-show-card-loader';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { MainPage } from './main-page';
import { mainPageLoader } from './main-page/api/main-page-loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: mainPageLoader,
    children: [
      {
        path: '/details/:id',
        loader: tvShowDetailsLoader,
        element: <TVShowDetails />,
      },
    ],
  },
  { path: '*', element: <h1>404. Not Found</h1> },
]);

export const Router = () => <RouterProvider router={router} />;
