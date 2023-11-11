import { RenderResult, render } from '@testing-library/react';
import {
  FetchedListDataContext,
  SearchInputContext,
  SearchSubmitContext,
  StoreDispatchContext,
  initialDispatch,
  initialState,
} from 'app/store/model/context';
import { Action, State } from 'app/store/model/types';
import { Dispatch, FC, ReactNode } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import {
  TVShowListResponse,
  isTVShowListResponse,
} from 'shared/api/myshows/myshows.service';
import { Endpoint } from 'shared/constants';
import mockDetailsResponseJson from './model/mock-details-response.json';
import mockListResponseJson from './model/mock-list-response.json';

type AllProvidersProps = {
  children: ReactNode;
  dispatch?: Dispatch<Action>;
} & Partial<State>;

export const MockContextProvider: FC<AllProvidersProps> = ({
  children,
  searchInputValue = initialState.searchInputValue,
  searchSubmitValue = initialState.searchSubmitValue,
  fetchedListData = initialState.fetchedListData,
  dispatch = initialDispatch,
}: AllProvidersProps) => {
  return (
    <SearchInputContext.Provider value={searchInputValue}>
      <SearchSubmitContext.Provider value={searchSubmitValue}>
        <FetchedListDataContext.Provider value={fetchedListData}>
          <StoreDispatchContext.Provider value={dispatch}>
            {children}
          </StoreDispatchContext.Provider>
        </FetchedListDataContext.Provider>
      </SearchSubmitContext.Provider>
    </SearchInputContext.Provider>
  );
};

type RouterOpts = Parameters<typeof createMemoryRouter>[1];

export const renderWithRouter = (
  element: ReactNode,
  opts?: RouterOpts,
  path = Endpoint.ROOT
): RenderResult => {
  const router = createMemoryRouter([{ path, element }], opts);
  return render(<RouterProvider router={router} />);
};

export const renderWithNestedRouter = (
  element: ReactNode,
  children: ReactNode,
  opts?: Parameters<typeof createMemoryRouter>[1],
  path: string = Endpoint.ROOT,
  subPath: string = Endpoint.DETAILS
): RenderResult => {
  const router = createMemoryRouter(
    [{ path, element, children: [{ path: subPath, element: children }] }],
    opts
  );
  return render(<RouterProvider router={router} />);
};

const getValidMockResponse = (json: unknown): TVShowListResponse => {
  if (!isTVShowListResponse(json)) {
    throw new Error('wrong mock type');
  }
  return json;
};

export const mockListResponse = getValidMockResponse({
  count: mockListResponseJson[0].result,
  list: mockListResponseJson[1].result,
});

export const mockListItem = mockListResponse.list[0];

export const mockDetailsResponse = mockDetailsResponseJson;

export * from '@testing-library/react';
