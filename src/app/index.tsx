import { Router } from 'pages/router';
import { LangContext } from 'shared/context/lang-context';
import './index.css';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Language } from 'shared/types/Language';

export const App = () => {
  const [lang, setLang] = useState<Language>('en');

  const langContext = useMemo<[Language, Dispatch<SetStateAction<Language>>]>(
    () => [lang, setLang],
    [lang]
  );

  return (
    <LangContext.Provider value={langContext}>
      <Router />
    </LangContext.Provider>
  );
};
