import { TVShowCard } from 'entities/tv-show-card';
import { Component } from 'react';
import { MyshowsApiService } from 'shared/api/myshows/myshows.service';
import { ApiShowSummary } from 'shared/api/myshows/types/response.type';

type TProps = Record<string, never>;
type TState = { currentList: ApiShowSummary[] };

export class TVShowGallery extends Component<TProps, TState> {
  state: TState = {
    currentList: [],
  };

  async componentDidMount() {
    const data = await MyshowsApiService.fetchTVShows();
    this.setState({ currentList: data.result });
  }

  render() {
    const items = this.state.currentList.map((tvShow) => (
      <li key={tvShow.id}>
        <TVShowCard data={tvShow} />
      </li>
    ));
    return <ul>{items}</ul>;
  }
}

MyshowsApiService.fetchTVShows().then(console.log);

/* 
{
    "id": 7718,
    "title": "Sherlock",
    "titleOriginal": "Sherlock",
    "status": "Canceled/Ended",
    "totalSeasons": 4,
    "year": 2010,
    "watching": 411511,
    "voted": 223921,
    "rating": 4.73,
    "images": [
        "9492ce09d3a31c32ba559f5936dac888.jpg",
        "6f65c09731780f38fcfd1eb13e2f46f7.jpg",
        "d1d9e8a4b5f53c48fcf41311e17c77fa.jpg",
        "b515afd004b8a71dc47520d330dfd453.jpg",
        "076a546fa74e98b80c3635a5a3975dff.jpg"
    ],
    "image": "https://media.myshows.me/shows/small/9/49/9492ce09d3a31c32ba559f5936dac888.jpg",
    "onlineCount": null,
    "promoUrl": null,
    "category": "show"
}
*/
