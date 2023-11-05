import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404Page from '../pages/Error404Page';
// import SearchPage from '../pages/SearchPage';
// import App from '../App';
import SearchPage from '../pages/SearchPage';

enum RouterPath {
  SEARCH = '/search',
  ERROR_404 = '/error404',
  NOT_FOUND = '*',
}
console.log('app routes');
const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path={`${RouterPath.SEARCH}`} element={<SearchPage />}> */}
      <Route path={`${RouterPath.SEARCH}`} element={<SearchPage />}>
        {/* <Route path={`${RouterPath.SEARCH}/:page`} element={<SearchPage />} />
        <Route path={`${RouterPath.NOT_FOUND}/*`} element={<Error404Page />} /> */}
      </Route>
      <Route path={RouterPath.NOT_FOUND} element={<Error404Page />}></Route>
    </Routes>
  );
};

export default AppRoutes;
