import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from 'features/error-boundary';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ErrorThrowingButton } from '.';

describe('Error throwing button', () => {
  const user = userEvent.setup();

  afterEach(() => {
    cleanup();
  });

  it('Pressing the button calls Errorboundary fallback', async () => {
    const errorMessage = 'Error thrown';

    render(
      <ErrorBoundary fallback={<h1>{errorMessage}</h1>}>
        <ErrorThrowingButton />
      </ErrorBoundary>
    );

    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
    vi.spyOn(console, 'log').mockImplementation(() => vi.fn());

    await user.click(screen.getByRole('button'));

    vi.restoreAllMocks();

    expect(screen.getByRole('heading', { name: errorMessage })).toBeVisible();
  });
});
