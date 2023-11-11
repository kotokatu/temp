import { GetByIdRequestBody } from './get-by-id-request-body.type';

export type GetByIdRequest = {
  jsonrpc: string;
  method: string;
  params: GetByIdRequestBody;
  id: number;
};
