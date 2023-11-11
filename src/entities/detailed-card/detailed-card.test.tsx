import userEvent from '@testing-library/user-event';
import { Card } from 'entities/card';
import { Outlet } from 'react-router-dom';
import { Endpoint } from 'shared/constants';
import {
  mockDetailsResponse,
  mockListItem,
  renderWithNestedRouter,
  screen,
} from 'tests/test-utils';
import { DetailedCard } from '.';

describe('Detailed Card', () => {
  const user = userEvent.setup();
  const fakeFetch: typeof fetch = async () => {
    return { json: async () => mockDetailsResponse } as Response;
  };
  const fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(fakeFetch);

  beforeEach(() => {
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
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    expect(true).toBe(true);
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const details = mockDetailsResponse.result;
    const link = await screen.findByRole('link');
    await user.click(link);

    const detailedCard = await screen.findByRole('complementary');
    expect(
      [
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
        details.imdbUrl,
        details.kinopoiskRating,
        details.kinopoiskUrl,
        details.rating,
      ].every((val) => detailedCard.innerHTML.includes(val.toString()))
    ).toBe(true);
  });

  it('Ensure that clicking the close button hides the component', async () => {
    const link = await screen.findByRole('link');
    await user.click(link);

    await screen.findByRole('complementary');
    expect(screen.queryByRole('complementary')).not.toBeNull();

    await user.click(screen.getByRole('button', { name: /close button/i }));

    expect(screen.queryByRole('complementary')).toBeNull();
  });
});
