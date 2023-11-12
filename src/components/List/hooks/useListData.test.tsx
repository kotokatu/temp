import '@testing-library/jest-dom';
import { RenderHookResult, renderHook } from '@testing-library/react';
import useListData from './useListData';
// import { Context } from '../../../pages/SearchPage';
// import App from '../../../App';
interface ListData {
  count: number;
  linesPerPage: number;
  start: number;
  finish: number;
  startOffset: number;
  finishOffset: number;
  hidden: boolean;
  getName: (index: number) => string;
  getLink: (index: number) => string;
}

let listData: RenderHookResult<ListData, undefined>;
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
  listData = renderHook(() =>
    useListData({
      page: 1,
      count: 0,
      linesPerPage: 10,
      linksToPages: 2,
      items: [],
      status: '',
    })
  );
  // console.log(listData);
  // render(<App />);
  expect(listData.result.current.count).toBe(0);
  expect(listData.result.current.linesPerPage).toBe(10);
  expect(listData.result.current.start).toBe(0);
  expect(listData.result.current.finish).toBe(0);
  expect(listData.result.current.startOffset).toBe(1);
  expect(listData.result.current.finishOffset).toBe(0);
  expect(listData.result.current.hidden).toBe(true);

  listData = renderHook(() =>
    useListData({
      page: 1,
      count: 10,
      linesPerPage: 10,
      linksToPages: 2,
      items: [],
      status: '',
    })
  );
  listData = renderHook(() => useListData());
  // expect(listData.result.current).toBe(undefined);
  // console.log(listData);
  // render(<App />);
  /*  expect(listData.result.current.count).toBe(10);
  expect(listData.result.current.linesPerPage).toBe(10);
  expect(listData.result.current.start).toBe(0);
  expect(listData.result.current.finish).toBe(10);
  expect(listData.result.current.startOffset).toBe(1);
  expect(listData.result.current.finishOffset).toBe(10);
  expect(listData.result.current.hidden).toBe(false);

  listData = renderHook(() =>
    useListData({
      page: 2,
      count: 20,
      linesPerPage: 10,
      linksToPages: 2,
      items: [],
      status: '',
    })
  );
  // console.log(listData);
  // render(<App />);
  expect(listData.result.current.count).toBe(20);
  expect(listData.result.current.linesPerPage).toBe(10);
  expect(listData.result.current.start).toBe(10);
  expect(listData.result.current.finish).toBe(20);
  expect(listData.result.current.startOffset).toBe(11);
  expect(listData.result.current.finishOffset).toBe(10);
  expect(listData.result.current.hidden).toBe(false);
*/
  // if (listData) expect(Object(listData).count).toBe(undefined);
  // if (listData) expect(Object(listData).linesPerPage).toBe(undefined);
});
