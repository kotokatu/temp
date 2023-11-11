import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { routes } from './router';

export const App: FC = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />;
};
