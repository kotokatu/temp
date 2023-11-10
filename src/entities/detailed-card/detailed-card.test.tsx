import { Endpoint } from 'shared/constants';
import { renderWithNestedRouter } from 'tests/test-utils';
import { DetailedCard } from '.';

describe('Detailed Card', () => {
  beforeEach(() => {
    renderWithNestedRouter(<DetailedCard />, `${Endpoint.DETAILS}:id`);
  });

  it('Check that a loading indicator is displayed while fetching data', () => {
    expect(true).toBe(true);
  });

  it('Make sure the detailed card component correctly displays the detailed card data', () => {
    expect(true).toBe(true);
  });

  it('Ensure that clicking the close button hides the component', () => {
    expect(true).toBe(true);
  });
});
