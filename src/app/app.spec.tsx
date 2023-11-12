import { cleanup, render, screen } from 'tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from '.';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('App renders', async () => {
    render(<App />);

    expect(screen.getByRole('main')).not.toBeNull();
  });
});
