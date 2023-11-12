import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '.';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('App renders', async () => {
    render(<App />);

    expect(screen.getByRole('main')).toBeVisible();
  });
});
