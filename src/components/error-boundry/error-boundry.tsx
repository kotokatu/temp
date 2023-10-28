import { Component } from 'react';
import { IChildren, IErrorState } from '../types';

import ErrorMessage from '../error-message';

export default class ErrorBoundry extends Component<IChildren, IErrorState> {
  public state: IErrorState = {
    hasError: false,
  };

  componentDidCatch(): void {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
