import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './main-page';
import { ErrorPage } from './error-page';

const router = createBrowserRouter([
  { path: '/', element: <MainPage />, errorElement: <ErrorPage /> },
]);

export const Router = () => <RouterProvider router={router} />;
