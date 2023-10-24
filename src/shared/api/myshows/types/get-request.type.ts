import { GetRequestBody } from '.';

export type GetRequest = {
  jsonrpc: string;
  method: string;
  params: GetRequestBody;
  id: number;
};
