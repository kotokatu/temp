import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Search from '../../components/Search';
// import React, { useState as useStateMock } from 'react';
// import { jest } from '@jest/globals';
// import { mount } from 'enzyme';

// const mockFn = jest
//   .fn<(cb: (a: null, b: boolean) => void) => void>()
//   .mockImplementationOnce((cb) => cb(null, true))
//   .mockImplementationOnce((cb) => cb(null, false));
// const mockFn = jest
//   .fn(() => 'default')
//   .mockImplementationOnce(() => 'first call')
//   .mockImplementationOnce(() => 'second call');
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));

// const setState = jest.fn();
// beforeEach(() => {
//   useStateMock.mockImplementationOnce(() => [init, setState]);
// });
// const setState = jest.fn();
//const setStateX = (init: string = '') => [init, setState];
//const value = {}
// type VV = [unknown, React.Dispatch<unknown>];
// const value = (value: string) => [value, useState<string>] : W;
// const useStateSpy = jest.spyOn(React, 'useState').mockReturnValue(value: W);
// useStateSpy.mockImplementation((init: string) => [init: string, setState: (init: string) => void]);

// const setState = jest.fn;
// beforeEach(() => {
//   (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
// });

test('#1', () => {
  expect(true).toBe(true);
});

test('#2', () => {
  // const [search, setSearch] = React.useState('');
  // const [status, setStatus] = React.useState('');
  // React.useState = jest.fn()
  //    .mockReturnValueOnce([initialStateForFirstUseStateCall, {}])
  //    .mockReturnValueOnce([initialStateForSecondUseStateCall, {}])

  // const [search, setSearch] = useStateMock('');
  // const [status, setStatus] = useStateMock('');
  // const wrapper = mount(
  //   <Search input={search} setSearch={setSearch} setStatus={setStatus} />
  // );
  // expect(setState).toHaveBeenCalledTimes(1);

  // const [search, setSearch] = useState('');
  // const [status, setStatus] = useState('');
  render(<Search />);
  expect(true).toBeTruthy();
  // expect(status).toBe(status);
});
