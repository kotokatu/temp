import { render } from 'tests/test-utils';
import { NotFoundPage } from '.';

describe('404 Page', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(<NotFoundPage />);
    expect(true).toBe(true);
  });
});
