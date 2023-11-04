import Header from '../header';
import ErrorButton from '../error-button';
import { Outlet } from 'react-router';

export default function Layout(): JSX.Element {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <ErrorButton />
    </div>
  );
}
