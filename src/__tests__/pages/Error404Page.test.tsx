import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Error404Page from '../../pages/Error404Page';

test('#1', () => {
  expect(true).toBe(true);
});

test('#2', () => {
  render(<Error404Page />);
  expect(true).toBeTruthy();
});
