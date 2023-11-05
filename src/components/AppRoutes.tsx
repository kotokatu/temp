import { Route, Routes } from 'react-router-dom';
import Error404Page from '../pages/Error404Page';
import SearchPage from '../pages/SearchPage';

enum RouterPath {
  SEARCH = '/search',
  ERROR_404 = '/error404',
  NOT_FOUND = '*',
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`${RouterPath.SEARCH}`} element={<SearchPage />} />
      <Route path={RouterPath.NOT_FOUND} element={<Error404Page />}></Route>
    </Routes>
  );
};

export { AppRoutes, RouterPath };
