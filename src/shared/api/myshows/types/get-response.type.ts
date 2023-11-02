export type GetResponse<TResult> = {
  jsonrpc: string;
  result: TResult;
  id: number;
};
