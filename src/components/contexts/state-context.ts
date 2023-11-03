import React from 'react';
import { AppState } from '../types';

export const StateContext: React.Context<AppState> =
  React.createContext<AppState>({
    term: '',
    data: [],
    setSearchTerm: (): void => {},
    searchData: (): void => {},
    loading: false,
  });
