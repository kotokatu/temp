import { GetByIdRequestBody } from '.';

export type GetByIdRequest = {
  jsonrpc: string;
  method: string;
  params: GetByIdRequestBody;
  id: number;
};
