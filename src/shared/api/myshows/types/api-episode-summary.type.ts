export type ApiEpisodeSummary = {
  id?: number;
  title?: string;
  showId?: number;
  seasonNumber?: number;
  episodeNumber?: number;
  airDate?: string;
  airDateUTC?: string;
  images?: string[];
  image?: string;
  shortName?: string;
  commentsCount?: number;
  isSpecial?: number;
};
