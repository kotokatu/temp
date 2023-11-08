import { DetailedCard } from 'entities/detailed-card';
import { detailedCardLoader } from 'entities/detailed-card/api/detailed-card-loader';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Endpoint } from 'shared/constants';
import { ErrorPage } from '../../pages/error-page';
import { MainPage } from '../../pages/main-page';
import { mainPageLoader } from '../../pages/main-page/api/main-page-loader';

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

export const Router: FC = () => <RouterProvider router={router} />;
