import { DetailedCard } from 'entities/detailed-card';
import { ErrorPage } from 'pages/error-page';
import { MainPage } from 'pages/main-page';
import { NotFoundPage } from 'pages/not-found-page';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Endpoint } from 'shared/constants';

const router = createBrowserRouter([
  {
    path: Endpoint.ROOT,
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [{ path: `${Endpoint.DETAILS}:id`, element: <DetailedCard /> }],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export const Router: FC = () => <RouterProvider router={router} />;
