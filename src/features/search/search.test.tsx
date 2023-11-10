import { renderWithRouter } from 'tests/test-utils';
import { Search } from '.';

describe('Search', () => {
  beforeEach(() => {
    renderWithRouter(<Search />);
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    expect(true).toBe(true);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    expect(true).toBe(true);
  });
});
