import userEvent from '@testing-library/user-event';
import { DetailedCard } from 'entities/detailed-card';
import { Outlet } from 'react-router-dom';
import { Endpoint } from 'shared/constants';
import {
  mockDetailsResponse,
  mockListItem,
  renderWithNestedRouter,
  screen,
  within,
} from 'tests/test-utils';
import { Card } from '.';

describe('Card', () => {
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

  it('Ensure that the card component renders the relevant card data', async () => {
    const { title, year, image, totalSeasons, rating } = mockListItem;
    const { textContent } = screen.getByLabelText(/card description/i);
    const checklist = [year, totalSeasons, rating];

    const card = await screen.findByRole('link');

    expect(within(card).getByRole('heading').textContent).toBe(title);
    expect(within(card).getByRole<HTMLImageElement>('img').src).toBe(image);
    expect(checklist).toSatisfy<typeof checklist>((checklist) => {
      return checklist.every((item) => {
        return (
          typeof item === 'undefined' || textContent?.includes(item.toString())
        );
      });
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    expect(screen.queryByRole('complementary')).toBeNull();

    const card = await screen.findByRole('link');

    await user.click(card);
    expect(await screen.findByRole('complementary')).not.toBeNull();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    expect(fetchSpy).not.toBeCalled();

    for (let i = 1; i <= 5; i += 1) {
      await user.click(await screen.findByRole('link'));
      expect(fetchSpy).toBeCalledTimes(i);

      const closeButton = await screen.findByRole('button', {
        name: /close button/i,
      });
      await user.click(closeButton);
    }
  });
});
