import { I18n } from 'next-translate';
import { useContext, useMemo } from 'react';

import { I18nContext } from './I18nProvider';
import { wrapTWithDefaultNs } from './wrapTWithDefaultNs';

export const useTranslation = (defaultNS?: string): I18n => {
  const ctx = useContext(I18nContext);

  return useMemo(
    () => ({
      ...ctx,
      t: wrapTWithDefaultNs(ctx.t, defaultNS)
    }),
    [ctx, defaultNS]
  );
};
