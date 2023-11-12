import { cleanup, render, screen } from '@testing-library/react';
import { routes } from 'app/router';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Endpoint } from 'shared/constants';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('404 Page', () => {
  beforeEach(() => {
    render(
      <RouterProvider
        router={createMemoryRouter(routes, {
          initialEntries: [
            Endpoint.ROOT,
            `${Endpoint.ROOT}${'iddqd'.repeat(30)}`,
          ],
          initialIndex: 1,
        })}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    expect(
      screen.getByRole('heading', { name: '[404] Not Found' })
    ).toBeVisible();
  });
});
