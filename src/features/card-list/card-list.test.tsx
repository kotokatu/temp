import { noResultsMessage } from 'shared/constants';
import {
  MockContextProvider,
  mockResponse,
  render,
  renderWithRouter,
  screen,
} from 'tests/test-utils';
import { CardList } from '.';

describe('Card List', () => {
  it('Verify that the component renders the specified number of cards', () => {
    const expected = mockResponse.list.length;

    renderWithRouter(
      <MockContextProvider fetchedListData={mockResponse}>
        <CardList />
      </MockContextProvider>
    );

    expect(screen.queryByRole('list')?.childElementCount).toBe(expected);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <MockContextProvider>
        <CardList />
      </MockContextProvider>
    );

    const result = screen.queryByText(noResultsMessage, { exact: false });

    expect(result).not.toBeNull();
  });
});
