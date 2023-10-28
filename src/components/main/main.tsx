import { Component } from 'react';
import { StateContext } from '../contexts';

import './main.css';
import ItemList from '../item-list';

export default class Main extends Component {
  render() {
    return (
      <div className="main container-fluid">
        <StateContext.Consumer>
          {(state) => {
            return <ItemList mainState={state} />;
          }}
        </StateContext.Consumer>
      </div>
    );
  }
}
