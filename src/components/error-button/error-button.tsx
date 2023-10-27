import { Component } from 'react';

import './error-button.css';

export default class ErrorButton extends Component {
  state = {
    hasError: false,
  };

  onSetError = () => {
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
