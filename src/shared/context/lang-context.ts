import { createContext } from 'react';
import { Language } from 'shared/types/Language';

type LangContextType = [
  lang: Language,
  setLang: React.Dispatch<React.SetStateAction<Language>>,
];

export const LangContext = createContext<LangContextType>(['en', () => void 0]);
