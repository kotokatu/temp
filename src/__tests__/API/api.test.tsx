import '@testing-library/jest-dom';
import { getTotalCount, getItemsList } from '../../API/api';

test('#1', () => {
  expect(getTotalCount('')).toBeTruthy();
  expect(
    getItemsList({ page: 1, limit: 10, search: '', totalCount: 0 })
  ).toBeTruthy();
});
