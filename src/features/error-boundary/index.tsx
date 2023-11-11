import { Component, ErrorInfo, ReactNode } from 'react';
import {
  ErrorBoundaryProps as Props,
  ErrorBoundaryState as State,
} from './model/error-boundary.type';

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log(error, info.componentStack);
  }

  render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
