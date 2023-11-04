import { LoaderFunction, defer } from 'react-router-dom';
import { fetchTVShowById } from 'shared/api/myshows/myshows.service';
import { defaultLanguage } from 'shared/constants';
import { isNullOrUndefined } from 'shared/lib/is-null-or-undefined';

export const tvShowDetailsLoader: LoaderFunction = ({ params: { id } }) => {
  if (isNullOrUndefined(id)) {
    throw new Error('invalid id');
  }

  return defer({
    tvShowDetails: fetchTVShowById(
      { showId: +id, withEpisodes: true },
      defaultLanguage
    ),
  });
};
