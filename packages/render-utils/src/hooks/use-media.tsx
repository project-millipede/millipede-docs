import { useMemo, useState, useTransition } from 'react';

import { isBrowser } from '../utils/isBrowser';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useMedia = (
  query: string,
  onChange?: (matched: boolean) => void,
  initialState: boolean | (() => boolean) = false
): [boolean, boolean] => {
  const [isPending, startTransition] = useTransition();

  const mql = useMemo(() => {
    return isBrowser() ? window.matchMedia(query) : null;
  }, [query]);

  const [matched, setState] = useState(mql ? mql.matches : initialState);

  useIsomorphicLayoutEffect(() => {
    if (mql) {
      const onMediaChange = () => {
        const matched = mql.matches;

        startTransition(() => {
          setState(matched);
        });

        onChange && onChange(matched);
      };

      mql.addEventListener('change', onMediaChange);

      return () => {
        mql.removeEventListener('change', onMediaChange);
      };
    }
  }, [mql, onChange]);

  return [matched, isPending];
};
