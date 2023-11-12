import { cleanup, renderWithRouter, screen } from 'tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { ErrorMessage, ErrorPage } from '.';

describe('Error page', () => {
  afterEach(() => {
    cleanup();
  });

  it('ErrorMessage component prints error message', async () => {
    const errorMessage = 'Error thrown';

    renderWithRouter(<ErrorMessage error={new Error(errorMessage)} />);

    expect(screen.getByText(errorMessage)).not.toBeNull();
  });

  it('Error page renders', async () => {
    renderWithRouter(<ErrorPage />);

    expect(
      screen.getByRole('heading', { name: /errorboundary/i })
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).not.toBeNull();
  });
});
