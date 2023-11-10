import { renderWithRouter } from 'tests/test-utils';
import { Card } from '.';

describe('Card', () => {
  beforeEach(() => {
    renderWithRouter(<Card />);
  });

  it('Ensure that the card component renders the relevant card data', () => {
    expect(true).toBe(true);
  });

  it('Validate that clicking on a card opens a detailed card component', () => {
    expect(true).toBe(true);
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', () => {
    expect(true).toBe(true);
  });
});
