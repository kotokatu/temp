import { cleanup, renderWithRouter, screen } from 'tests/test-utils';
import { MainPage } from '.';

describe('Main page', () => {
  afterEach(() => {
    cleanup();
  });

  it('Main page renders', async () => {
    renderWithRouter(<MainPage />);

    expect(screen.getByRole('main')).not.toBeNull();
  });
});
