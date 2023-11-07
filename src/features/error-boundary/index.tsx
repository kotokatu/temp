import { Component, ErrorInfo } from 'react';
import { TProps, TState } from './model/types';

export class ErrorBoundary extends Component<TProps, TState> {
  state: TState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
