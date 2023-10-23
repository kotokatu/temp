import { Card } from 'entities/superhero-card';
import { Component } from 'react';
import { Character, ComicVineApiService } from 'shared/api/comicvine.service';

export class Gallery extends Component {
  state: {
    currentList: Character[];
  } = {
    currentList: [],
  };

  async componentDidMount() {
    const data = await ComicVineApiService.fetchCharacterList({});
    console.log(data);
    this.setState({ currentList: data.results });
  }

  render() {
    const items = this.state.currentList.map((person) => (
      <li key={person.id}>
        <Card data={person} />
      </li>
    ));
    return <ul>{items}</ul>;
  }
}
