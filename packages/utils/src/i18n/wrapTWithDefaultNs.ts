import { Translate } from 'next-translate';

import { GuardUtil } from '..';

const { isString } = GuardUtil.Primitives;

export const wrapTWithDefaultNs = (
  oldT: Translate,
  ns?: string | null
): Translate => {
  if (!isString(ns)) return oldT;

  // Use default namespace if namespace is missing
  const t: Translate = (key, query, options) => {
    return oldT(key, query, { ns, ...options });
  };

  return t;
};
