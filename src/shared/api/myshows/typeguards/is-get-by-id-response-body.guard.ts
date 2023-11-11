import { isNullOrUndefined } from 'shared/lib/is-null-or-undefined';
import { isObject } from 'shared/lib/is-object';
import { isTypesCorrect } from 'shared/lib/is-types-correct';
import { GetByIdResponseBody } from '../types/get-by-id-response-body.type';
import { isApiEpisodeSummary } from './is-api-episode-summary.guard';
import { isApiNetwork } from './is-api-network.guard';
import { isApiOnlineLink } from './is-api-online-link.guard';

export const isGetByIdResponseBody = (
  obj: Record<string, unknown>
): obj is GetByIdResponseBody => {
  const types = [
    { key: 'id', type: 'number' },
    { key: 'title', type: 'string' },
    { key: 'titleOriginal', type: 'string' },
    { key: 'description', type: 'string' },
    { key: 'totalSeasons', type: 'number' },
    { key: 'status', type: 'string' },
    { key: 'country', type: 'string' },
    { key: 'countryTitle', type: 'string' },
    { key: 'started', type: 'string' },
    { key: 'ended', type: 'string' },
    { key: 'year', type: 'number' },
    { key: 'kinopoiskId', type: 'number' },
    { key: 'kinopoiskRating', type: 'number' },
    { key: 'kinopoiskVoted', type: 'number' },
    { key: 'kinopoiskUrl', type: 'string' },
    { key: 'tvrageId', type: 'number' },
    { key: 'imdbId', type: 'number' },
    { key: 'imdbRating', type: 'number' },
    { key: 'imdbVoted', type: 'number' },
    { key: 'imdbUrl', type: 'string' },
    { key: 'watching', type: 'number' },
    { key: 'watchingTotal', type: 'number' },
    { key: 'voted', type: 'number' },
    { key: 'rating', type: 'number' },
    { key: 'runtime', type: 'number' },
    { key: 'runtimeTotal', type: 'string' },
    { key: 'images', type: 'string', isArray: true },
    { key: 'image', type: 'string' },
    { key: 'genreIds', type: 'number', isArray: true },
  ];

  const { network, episodes, onlineLinks, onlineLinkExclusive } = obj;

  return (
    isTypesCorrect(obj, types) &&
    (isNullOrUndefined(network) ||
      (isObject(network) && isApiNetwork(network))) &&
    (isNullOrUndefined(episodes) ||
      (Array.isArray(episodes) && episodes.every(isApiEpisodeSummary))) &&
    (isNullOrUndefined(onlineLinks) ||
      (Array.isArray(onlineLinks) && onlineLinks.every(isApiOnlineLink))) &&
    (isNullOrUndefined(onlineLinkExclusive) ||
      (isObject(onlineLinkExclusive) && isApiOnlineLink(onlineLinkExclusive)))
  );
};
