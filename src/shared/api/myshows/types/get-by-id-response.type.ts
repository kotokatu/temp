import { GetByIdResponseBody } from '.';
import { ApiResponseError } from './api-response-error.type';

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
