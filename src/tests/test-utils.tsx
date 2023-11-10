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
import {
  Outlet,
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { Endpoint } from 'shared/constants';

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

export const renderWithRouter = (
  element: ReactNode,
  opts?: Parameters<typeof createMemoryRouter>[1],
  path = Endpoint.ROOT
): RenderResult => {
  const route = { path, element };
  const router = createMemoryRouter([route], opts);
  const provider = <RouterProvider router={router} />;
  return render(provider);
};

export const renderWithNestedRouter = (
  element: ReactNode,
  path: string,
  opts?: Parameters<typeof createMemoryRouter>[1]
): RenderResult => {
  const route: RouteObject = {
    path: Endpoint.ROOT,
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [{ path, element }],
  };
  const router = createMemoryRouter([route], opts);
  const provider = <RouterProvider router={router} />;
  return render(provider);
};

export * from '@testing-library/react';
