import { ApiResponseError } from './api-response-error.type';

export type GetResponse<TResult> =
  | {
      jsonrpc: string;
      error: ApiResponseError;
      id: number;
    }
  | {
      jsonrpc: string;
      result: TResult;
      id: number;
    };
