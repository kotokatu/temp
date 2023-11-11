import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from 'tests/test-utils';
import { ErrorThrowingButton } from '.';
import { ErrorBoundary } from 'features/error-boundary';

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

    await user.click(await screen.findByRole('button'));

    vi.restoreAllMocks();

    expect(
      await screen.findByRole('heading', { name: errorMessage })
    ).not.toBeNull();
  });
});
