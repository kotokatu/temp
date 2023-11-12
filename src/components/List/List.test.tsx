import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import List from './List';
import { createContext } from 'react';
import { Context, Detail } from '../../pages/SearchPage';

test('#1', () => {
  expect(true).toBe(true);
});

test('#2', () => {
  const ThemeContext = createContext<Context>({
    page: 1,
    count: 100,
    linesPerPage: 10,
    linksToPages: 2,
    items: [],
    status: '',
  });
  const page = 1;
  const count = 100;
  const linesPerPage = 10;
  const linksToPages = 2;
  const names: Detail[] = [];
  const status = '';
  render(
    <ThemeContext.Provider
      value={{
        page,
        count,
        linesPerPage,
        linksToPages,
        items: names,
        status,
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
