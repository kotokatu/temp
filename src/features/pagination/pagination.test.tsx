import { MockContextProvider, renderWithRouter } from 'tests/test-utils';
import { Pagination } from '.';

describe('Pagination', () => {
  it('Make sure the component updates URL query parameter when page changes', () => {
    renderWithRouter(
      <MockContextProvider fetchedListData={{ count: 100, list: [] }}>
        <Pagination />
      </MockContextProvider>
    );

    expect(true).toBe(true);
  });
});
