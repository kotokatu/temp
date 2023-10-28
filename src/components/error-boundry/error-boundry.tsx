import { Component } from 'react';
import { IChildren } from '../types';

import ErrorMessage from '../error-message';

export default class ErrorBoundry extends Component<IChildren> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
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
