import { SearchBar } from 'features/search-bar';
import { Component } from 'react';
import { Gallery } from 'widgets/superhero-gallery';
import { Header } from 'widgets/header';

export class MainPage extends Component {
  render() {
    return (
      <>
        <Header>
          <SearchBar />
        </Header>
        <main>
          <Gallery />
        </main>
      </>
    );
  }
}
