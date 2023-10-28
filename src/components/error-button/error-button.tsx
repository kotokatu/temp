import { Component } from 'react';

import './error-button.css';
import { IErrorState, IProps } from '../types';

export default class ErrorButton extends Component<IProps, IErrorState> {
  state = {
    hasError: false,
  };

  onSetError = (): void => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Oops! Something bad happened!');
    }

    return (
      <button
        className="error-button btn btn-danger btn-lg"
        onClick={this.onSetError}
      >
        Throw Error
      </button>
    );
  }
}
