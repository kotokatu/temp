import { SearchBar } from 'features/search-bar';
import { Component } from 'react';
import { Header } from 'widgets/header';
import { TVShowGallery } from 'widgets/tv-show-gallery';

export class MainPage extends Component {
  render() {
    return (
      <>
        <Header>
          <SearchBar />
        </Header>
        <main>
          <TVShowGallery />
        </main>
      </>
    );
  }
}
