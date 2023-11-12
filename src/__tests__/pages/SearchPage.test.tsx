import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from '../../pages/SearchPage';

test('#1', () => {
  expect(true).toBe(true);
});

test('#2', () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
  expect(true).toBeTruthy();
});
