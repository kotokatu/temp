import { Component, ErrorInfo } from 'react';
interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError?: boolean;
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  state = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <>
          <h2 data-testid="error-boundary">Something went wrong.</h2>
          <details className="error-info">
            {`${this.state.error}`}
            <br />
            {Object(this.state.errorInfo).componentStack.toString()}
          </details>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
