import React from 'react';
import { SearchBarState } from '../types';

export const StateContext: React.Context<SearchBarState> =
  React.createContext<SearchBarState>({
    term: '',
    people: [],
    setSearchTerm: () => {},
    searchPerson: () => {},
  });
