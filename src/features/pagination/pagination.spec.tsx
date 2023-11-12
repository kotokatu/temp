import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { pageParamName } from 'shared/constants';
import { MockContextProvider } from 'tests/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Pagination } from '.';

describe('Pagination', () => {
  const user = userEvent.setup();
  const getPageParam = (): string => {
    return new URLSearchParams(location.search).get(pageParamName) ?? '';
  };

  beforeEach(() => {
    const element = (
      <MockContextProvider fetchedListData={{ count: 300, list: [] }}>
        <Pagination />
      </MockContextProvider>
    );
    const router = createBrowserRouter([{ path: '/', element }]);

    render(<RouterProvider router={router} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Make sure the component updates URL query parameter when page changes', async () => {
    const initialPage = getPageParam();
    expect(initialPage).toSatisfy<string>((value) => ['', '1'].includes(value));
    for (let i = 2; i <= 10; i += 1) {
      await user.click(await screen.findByLabelText('go to next'));
      expect(getPageParam()).toBe(i.toString());
    }
  });
});
