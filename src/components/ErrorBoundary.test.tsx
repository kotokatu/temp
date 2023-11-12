import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
// const { getComputedStyle } = global.window;

// const consoleMock = jest.spyOn(console, 'error');
// beforeEach(() => {
//   consoleMock.mockImplementation(() => {});
// });

// afterEach(() => {
//   consoleMock.mockRestore();
// });

// test('#1', () => {
//   expect(true).toBe(true);
// });

// test('#2', () => {
//   expect(() => {
//     const ThrowError = () => {
//       throw new Error('Test error');
//     };
//     try {
//       render(
//         <ErrorBoundary>
//           <ThrowError />
//         </ErrorBoundary>
//       );
//       throw new Error('test1');
//     } catch (error) {
//       // console.log(error);
//       throw new Error('test');
//     }
//     // throw new Error('test error');
//   }).toThrow(Error);
//   // throw new Error('test error');
//   // const ThrowError = () => {
//   //   throw new Error('Test error');
//   // };
//   // try {
//   //   render(
//   //     <ErrorBoundary>
//   //       <ThrowError />
//   //     </ErrorBoundary>
//   //   );
//   // } catch (e) {
//   //   expect(() => ThrowError()).toThrow(Error);
//   //   // console.log(e);
//   //   expect(screen.getByTestId('error-boundary')).toBeVisible();
//   // }
// });
describe('ErrorBoundary', () => {
  let consoleErrorSpy = jest.spyOn(console, 'error');
  // let errorMock: Error;
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // to clear ErrorBoundary errors in cli
    // errorMock = new Error('This is a test error!');
    // workingComponent = () => null;
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore(); // called after to reset the consoleError ---- reset props to default
  });

  test('should render ', () => {
    // const WorkingComponent = () => <></>;
    const ErrorComponent = () => {
      throw new Error('test');
    };
    // Default, everything is OK and children should get rendered
    /* const { */ /* asFragment, */ /* getByText } = */ render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    // const alert = getByText('Something went wrong.');
    expect(screen.getByTestId('error-boundary')).toBeVisible();
    // console.log('>>>', alert.parentNode);
    // expect(alert.parentNode).toHaveClass('error-info');
    // console.log('>>>', getByText);
    // expect(rerender.state.error).toBe(null);
    // expect(asFragment().getInstance().state.hasError).toBe(false);
    // expect(asFragment()).toMatchSnapshot();
  });
});
