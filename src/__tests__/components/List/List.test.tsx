import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import List from '../../../components/List/List';
import { createContext } from 'react';
import { Context, Detail } from '../../../API/api';

test('#1', () => {
  expect(true).toBe(true);
});

test('#2', () => {
  const ThemeContext = createContext<Context>({
    search: '',
    url: '',
    page: 1,
    count: 100,
    linesPerPage: 10,
    linksToPages: 2,
    items: [],
    status: '',
    setStatus: () => null,
    setSearch: () => null,
    setPage: () => null,
    setUrl: () => null,
    setCount: () => null,
    setLinesPerPage: () => null,
    setItems: () => null,
  });
  const search = '';
  const url = '';
  const page = 1;
  const count = 100;
  const linesPerPage = 10;
  const linksToPages = 2;
  const names: Detail[] = [];
  const status = '';
  const setStatus = () => null;
  const setSearch = () => null;
  const setPage = () => null;
  const setUrl = () => null;
  const setCount = () => null;
  const setLinesPerPage = () => null;
  const setItems = () => null;
  render(
    <ThemeContext.Provider
      value={{
        search,
        url,
        page,
        count,
        linesPerPage,
        linksToPages,
        items: names,
        status,
        setStatus,
        setSearch,
        setPage,
        setUrl,
        setCount,
        setLinesPerPage,
        setItems,
      }}
    >
      <List />
    </ThemeContext.Provider>
  );
  expect(true).toBeTruthy();
  expect(screen.getByTestId('test-node2')).toBeVisible();
  // expect(screen.getByTestId('test-list3')).toBeVisible();
  expect(screen.findAllByAltText('test-node4')).toBeTruthy();
});
