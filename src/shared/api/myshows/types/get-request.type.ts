import { GetRequestBody } from './get-request-body.type';

export type GetRequest = {
  jsonrpc: string;
  method: string;
  params: GetRequestBody;
  id: number;
};
