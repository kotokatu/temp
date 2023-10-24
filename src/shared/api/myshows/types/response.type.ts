export type ApiShowSummary = {
  id?: number;
  title?: string;
  titleOriginal?: string;
  status?: string;
  totalSeasons?: number;
  year?: number;
  watching?: number;
  voted?: number;
  rating?: number;
  images?: string[];
  image?: string;
  onlineCount?: number;
  promoUrl?: string;
  category?: string;
};

export type GetResponse = {
  jsonrpc: string;
  result: ApiShowSummary[];
  id: number;
};
