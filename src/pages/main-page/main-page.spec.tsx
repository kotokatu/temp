import { cleanup, screen } from '@testing-library/react';
import { renderWithRouter } from 'tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { MainPage } from '.';

describe('Main page', () => {
  afterEach(() => {
    cleanup();
  });

  it('Main page renders', async () => {
    renderWithRouter(<MainPage />);

    expect(screen.getByRole('main')).toBeVisible();
  });
});
