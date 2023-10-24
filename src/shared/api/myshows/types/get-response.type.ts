import { ApiShowSummary } from '.';

export type GetResponse = {
  jsonrpc: string;
  result: ApiShowSummary[];
  id: number;
};
