import { Component } from 'react';

import './app.css';
import SearchBar from '../search-bar';
import ItemList from '../item-list';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <SearchBar />
        <ItemList />
      </div>
    );
  }
}
