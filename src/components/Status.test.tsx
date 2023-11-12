import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Status from './Status';

test('#1', () => {
  expect(true).toBe(true);
});

test('#2', () => {
  render(<Status />);
  expect(true).toBeTruthy();
});
