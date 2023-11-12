import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

test('#1', () => {
  // expect(true).toBe(true);
});

test('#2', () => {
  render(<App />);
  // expect(true).toBeTruthy();
});
