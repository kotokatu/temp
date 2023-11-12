import { cleanup, renderWithRouter, screen } from 'tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
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
