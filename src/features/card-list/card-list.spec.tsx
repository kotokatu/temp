import { noResultsMessage } from 'shared/constants';
import {
  MockContextProvider,
  cleanup,
  mockListResponse,
  render,
  renderWithRouter,
  screen,
} from 'tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { CardList } from '.';

describe('Card List', () => {
  afterEach(() => {
    cleanup();
  });

  it('Verify that the component renders the specified number of cards', () => {
    const expected = mockListResponse.list.length;

    renderWithRouter(
      <MockContextProvider fetchedListData={mockListResponse}>
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

    expect(
      screen.queryByText(noResultsMessage, { exact: false })
    ).not.toBeNull();
  });
});
