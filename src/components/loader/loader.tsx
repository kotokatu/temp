import { Component } from 'react';

import './loader.css';
import { IChildren, IProps } from '../types';

export default class Loader extends Component<IProps, IChildren> {
  render() {
    return <span className="loader"></span>;
  }
}
