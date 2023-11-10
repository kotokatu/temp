import { RouterPath, getSearchLink } from './routes';

test('#1', () => {
  expect(RouterPath).toBe(RouterPath);
});

test('#2', () => {
  expect(getSearchLink(0, 0, 0)).toBe(getSearchLink(0, 0, 0));
  expect(getSearchLink(null, 0, 0)).toBe(getSearchLink(null, 0, 0));
});
