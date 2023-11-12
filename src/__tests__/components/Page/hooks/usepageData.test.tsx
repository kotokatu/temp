import '@testing-library/jest-dom';
import { RenderHookResult, renderHook } from '@testing-library/react';
import usePageData from '../../../../components/Page/hooks/usePageData';
// import { Context } from '../../../pages/SearchPage';
// import App from '../../../App';
type PageButton = { link: number; label: string };
interface PageData {
  pageLink: (index: number, type: string) => { link: number; label: string };
  getPageLinks: () => PageButton[];
  getPageLink: (index: number) => string;
  getLinesPerPageLink: (index: number) => string;
}

let pageData: RenderHookResult<PageData, undefined>;
// let renderHook: RenderHookResult<unknown, count: number, Renderer<unknown>>;
// beforeEach(() => {
//   listData = renderHook(() =>
//     useListData({
//       page: 1,
//       count: 0,
//       linesPerPage: 10,
//       linksToPages: 2,
//       items: [],
//       status: '',
//     })
//   );
// });
test('#1', () => {
  pageData = renderHook(() =>
    usePageData({
      search: '',
      url: '',
      page: 1,
      count: 0,
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
    })
  );
  // console.log(listData);
  // render(<App />);
  expect(pageData.result.current).toBeTruthy();
  expect(pageData.result.current.pageLink(1, '').link).toBe(1);
  expect(pageData.result.current.pageLink(1, '').label).toBe('1');

  //  expect(pageData.result.current.pageLink(1, 'current').label).toBe('[1]');
  //  expect(pageData.result.current.pageLink(1, 'prev').label).toBe('<');
  //  expect(pageData.result.current.pageLink(1, 'next').label).toBe('>');
  // pageData = renderHook(() =>
  //   usePageData({
  //     page: 1,
  //     count: 10,
  //     linesPerPage: 10,
  //     linksToPages: 2,
  //     items: [],
  //     status: '',
  //   })
  // );
  pageData = renderHook(() => usePageData());
});
