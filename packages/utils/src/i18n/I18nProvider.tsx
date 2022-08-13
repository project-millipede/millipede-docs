import { I18nDictionary, Translate } from 'next-translate';
import transCore from 'next-translate/transCore';
import { createContext, FC, ReactNode } from 'react';

import { usePreviousNamespace } from './use-previous-namespace';

interface II18nContext {
  t: Translate;
  lang: string;
}

export const I18nContext = createContext<II18nContext>({
  t: key => {
    if (Array.isArray(key)) {
      const [firstKey] = key;
      return firstKey;
    }
    return key;
  },
  lang: ''
});

export interface I18nProviderProps {
  lang: string;
  namespaces?: Record<string, I18nDictionary>;
  children: ReactNode;
}

export const I18nProvider: FC<I18nProviderProps> = ({
  lang,
  namespaces,
  children
}) => {
  const allNamespaces = {
    ...usePreviousNamespace(namespaces, lang, null),
    ...namespaces
  };

  const t = transCore({
    config: {},
    allNamespaces,
    pluralRules: null,
    lang
  });

  return (
    <I18nContext.Provider
      value={{
        t,
        lang
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
