import { describe, expect, it } from 'vitest';
import { isApiEpisodeSummary } from '../typeguards/is-api-episode-summary.guard';
import { isApiNetwork } from '../typeguards/is-api-network.guard';
import { isApiOnlineLink } from '../typeguards/is-api-online-link.guard';
import { isApiShowSummary } from '../typeguards/is-api-show-summary.guard';
import { isGetByIdResponseBody } from '../typeguards/is-get-by-id-response-body.guard';

describe('Typeguards', () => {
  it('is api episode summary guard', () => {
    const mock1 = {
      id: 1,
      title: 'string',
      showId: 1,
      seasonNumber: 1,
      episodeNumber: 1,
      airDate: 'string',
      airDateUTC: 'string',
      images: ['string'],
      image: 'string',
      shortName: 'string',
      commentsCount: 1,
      isSpecial: false,
    };
    const mock2 = { id: '1', images: 'string' };

    expect(isApiEpisodeSummary(mock1)).toBe(true);
    expect(isApiEpisodeSummary(mock2)).toBe(false);
  });

  it('is api network guard', () => {
    const mock1 = { id: 1, title: 'wee', country: 'uk' };
    const mock2 = { id: '1', country: 1 };

    expect(isApiNetwork(mock1)).toBe(true);
    expect(isApiNetwork(mock2)).toBe(false);
  });

  it('is api online guard', () => {
    const mock1 = {
      title: 'string',
      description: 'string',
      source: 'string',
      url: 'string',
    };
    const mock2 = { title: 1 };

    expect(isApiOnlineLink(mock1)).toBe(true);
    expect(isApiOnlineLink(mock2)).toBe(false);
  });

  it('is api show summary guard', () => {
    const mock1 = {
      id: 1,
      title: 'string',
      titleOriginal: 'string',
      status: 'string',
      totalSeasons: 1,
      year: 1,
      watching: 1,
      voted: 1,
      rating: 1,
      images: ['string'],
      image: 'string',
      onlineCount: 1,
      promoUrl: 'string',
      category: 'string',
    };
    const mock2 = { id: '1' };

    expect(isApiShowSummary(mock1)).toBe(true);
    expect(isApiShowSummary(mock2)).toBe(false);
  });

  it('is get by id response body guard', () => {
    const mock1 = {
      id: 1,
      title: 'string',
      titleOriginal: 'string',
      description: 'string',
      totalSeasons: 1,
      status: 'string',
      country: 'string',
      countryTitle: 'string',
      started: 'string',
      ended: 'string',
      year: 1,
      kinopoiskId: 1,
      kinopoiskRating: 1,
      kinopoiskVoted: 1,
      kinopoiskUrl: 'string',
      tvrageId: 1,
      imdbId: 1,
      imdbRating: 1,
      imdbVoted: 1,
      imdbUrl: 'string',
      watching: 1,
      watchingTotal: 1,
      voted: 1,
      rating: 1,
      runtime: 1,
      runtimeTotal: 'string',
      images: ['string'],
      image: 'string',
      genreIds: [1],
      network: { id: 1, title: 'string', country: 'string' },
      episodes: null,
      onlineLinks: null,
      onlineLinkExclusive: null,
    };
    const mock2 = { id: '1' };

    expect(isGetByIdResponseBody(mock1)).toBe(true);
    expect(isGetByIdResponseBody(mock2)).toBe(false);
  });
});
