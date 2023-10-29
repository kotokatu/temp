import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError?: boolean;
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
  counter: number;
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null, counter: 0 };
  }
  state = { error: null, errorInfo: null, counter: 0 };
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details className='error-info'>
            {`${this.state.error}`}
            <br />
            {Object(this.state.errorInfo).componentStack.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App baseUrl='https://swapi.dev/api/people/?search=' />
    </ErrorBoundary>
  </React.StrictMode>
);
