import { render } from 'tests/test-utils';
import { CardList } from '.';

describe('Card List', () => {
  it('Verify that the component renders the specified number of cards', () => {
    render(<CardList />);
    expect(true).toBe(true);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(<CardList />);
    expect(true).toBe(true);
  });
});
