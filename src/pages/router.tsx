import { TVShowDetails } from 'entities/tv-show-details';
import { tvShowDetailsLoader } from 'entities/tv-show-details/api/tv-show-card-loader';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { MainPage } from './main-page';
import { mainPageLoader } from './main-page/api/main-page-loader';
import { Endpoint } from 'shared/constants';

const router = createBrowserRouter([
  {
    path: Endpoint.ROOT,
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: mainPageLoader,
    children: [
      {
        path: `${Endpoint.DETAILS}:id`,
        loader: tvShowDetailsLoader,
        element: <TVShowDetails />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
