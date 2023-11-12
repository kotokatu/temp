import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { reactElement, root } from './main';
// import { root } from './main';

test('#1', () => {
  // console.log('>>', element);
  expect(root).toBeTruthy();
  expect(reactElement).toBeTruthy();
  render(reactElement);
  // expect(screen.).toBeVisible();
});
