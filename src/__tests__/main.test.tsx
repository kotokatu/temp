import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { reactElement, root } from '../main';

test('#1', () => {
  expect(root).toBeTruthy();
  expect(reactElement).toBeTruthy();
  render(reactElement);
});
