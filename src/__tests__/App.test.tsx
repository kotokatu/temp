import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('#1', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
