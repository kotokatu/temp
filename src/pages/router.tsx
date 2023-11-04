import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TVShowDetails } from 'widgets/tv-show-details';
import { tvShowDetailsLoader } from 'widgets/tv-show-details/api/tv-show-card-loader';
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
        index: true,
        element: <div>kek</div>,
      },
      {
        path: '/details/:id',
        loader: tvShowDetailsLoader,
        element: <TVShowDetails />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
