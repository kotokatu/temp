import { DetailedCard } from 'entities/detailed-card';
import { detailedCardLoader } from 'entities/detailed-card/api/detailed-card-loader';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Endpoint } from 'shared/constants';
import { ErrorPage } from './error-page';
import { MainPage } from './main-page';
import { mainPageLoader } from './main-page/api/main-page-loader';

const router = createBrowserRouter([
  {
    path: Endpoint.ROOT,
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: mainPageLoader,
    children: [
      {
        path: `${Endpoint.DETAILS}:id`,
        loader: detailedCardLoader,
        element: <DetailedCard />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
