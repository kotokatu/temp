import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RouterPath } from '../router/routes';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import DetailPage from '../pages/DetailPage';
import Error404Page from '../pages/Error404Page';

test('12#Ensure that the 404 page is displayed when navigating to an invalid route', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/somewhere" />} />
        <Route path={`${RouterPath.SEARCH}`} element={<SearchPage />}>
          <Route path={':id'} element={<DetailPage />} />
        </Route>
        <Route path={RouterPath.NOT_FOUND} element={<Error404Page />}></Route>
      </Routes>
    </BrowserRouter>
  );
  expect(screen.getByTestId('test-node404')).toBeVisible();
});
