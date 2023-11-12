import { cleanup, screen } from '@testing-library/react';
import { renderWithRouter } from 'tests/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { ErrorMessage, ErrorPage } from '.';

describe('Error page', () => {
  afterEach(() => {
    cleanup();
  });

  it('ErrorMessage component prints error message', async () => {
    const errorMessage = 'Error thrown';

    renderWithRouter(<ErrorMessage error={new Error(errorMessage)} />);

    expect(screen.getByText(errorMessage)).toBeVisible();
  });

  it('Error page renders', async () => {
    renderWithRouter(<ErrorPage />);

    expect(
      screen.getByRole('heading', { name: /errorboundary/i })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeVisible();
  });
});
