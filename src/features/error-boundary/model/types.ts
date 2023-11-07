import { ReactNode } from 'react';

export type TProps = {
  fallback: ReactNode;
  children: ReactNode;
};
export type TState = {
  hasError: boolean;
};
