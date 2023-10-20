import { SearchBar } from 'features/search-bar';
import { Component } from 'react';
import { Gallery } from 'widgets/gallery';

export class MainPage extends Component {
  render() {
    return (
      <>
        <header>
          <SearchBar />
        </header>
        <main>
          <Gallery />
        </main>
      </>
    );
  }
}
