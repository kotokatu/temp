import { ApiResponseError } from './api-response-error.type';
import { GetByIdResponseBody } from './get-by-id-response-body.type';

export type GetByIdResponse =
  | {
      jsonrpc: string;
      result: GetByIdResponseBody;
      id: number;
    }
  | {
      jsonrpc: string;
      error: ApiResponseError;
      id: number;
    };
