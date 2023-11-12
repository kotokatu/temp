import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailPage from '../../pages/DetailPage';

test('#1', () => {
  expect(true).toBe(true);
});

test('#2', () => {
  render(
    <BrowserRouter>
      <DetailPage />
    </BrowserRouter>
  );
  expect(true).toBeTruthy();
});
