import { Route, Routes, Navigate } from 'react-router-dom';
import Error404Page from '../pages/Error404Page';
import SearchPage from '../pages/SearchPage';
import DetailPage from '../pages/DetailPage';
import { RouterPath } from '../router/routes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/search" />} />
      <Route path={`${RouterPath.SEARCH}`} element={<SearchPage />}>
        <Route path={':id'} element={<DetailPage />} />
      </Route>
      <Route path={RouterPath.NOT_FOUND} element={<Error404Page />}></Route>
    </Routes>
  );
};

export { AppRoutes };
