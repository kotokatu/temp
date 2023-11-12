import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from 'entities/card';
import { Outlet } from 'react-router-dom';
import { Endpoint } from 'shared/constants';
import {
  mockDetailsResponse,
  mockListItem,
  renderWithNestedRouter,
} from 'tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DetailedCard } from '.';

describe('Detailed Card', () => {
  const user = userEvent.setup();
  const pause = (ms: number): Promise<void> => {
    return new Promise((res) => setTimeout(res, ms));
  };

  const fakeFetch: typeof fetch = async () => {
    await pause(250);
    return { json: async () => mockDetailsResponse } as Response;
  };
  const fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(fakeFetch);

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    renderWithNestedRouter(
      <>
        <Card {...mockListItem} />
        <Outlet />
      </>,
      <DetailedCard />,
      {},
      Endpoint.ROOT,
      `${Endpoint.DETAILS}:id`
    );
  });

  afterEach(() => {
    fetchSpy.mockClear();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    await user.click(screen.getByRole('link'));

    const placeholder = screen.getByAltText(/image-placeholder/i);
    expect(placeholder).toBeVisible();

    vi.advanceTimersToNextTimer();

    expect(await screen.findByRole('complementary')).toBeVisible();
    expect(placeholder).not.toBeVisible();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const details = mockDetailsResponse.result;
    const detailsTextContentList = [
      details.title,
      details.titleOriginal,
      details.status,
      details.countryTitle,
      details.country,
      details.network.country,
      details.runtimeTotal,
      details.runtime,
      details.episodes.length,
      details.totalSeasons,
      details.imdbRating,
      details.kinopoiskRating,
      details.rating,
    ];
    const detailsInnerHtmlList = [details.imdbUrl, details.kinopoiskUrl];

    await user.click(screen.getByRole('link'));

    const detailedCard = await screen.findByRole('complementary');

    detailsTextContentList.forEach((detail) => {
      expect(detailedCard).toHaveTextContent(detail.toString());
    });

    detailsInnerHtmlList.forEach((detail) => {
      expect(detailedCard).toContainHTML(detail);
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    await user.click(screen.getByRole('link'));

    const detailedCard = await screen.findByRole('complementary');
    expect(detailedCard).toBeVisible();

    await user.click(screen.getByRole('button', { name: /close button/i }));

    expect(detailedCard).not.toBeVisible();
  });
});
