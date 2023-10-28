import React from 'react';
import { ISearchBarState } from '../types';

export const StateContext: React.Context<ISearchBarState> =
  React.createContext<ISearchBarState>({
    term: '',
    people: [],
    setSearchTerm: () => {},
    searchPerson: () => {},
    loading: false,
  });
