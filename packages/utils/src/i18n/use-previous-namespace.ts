import { useEffect, useRef } from 'react';

export const removeItem = <T>(
  state: { [key: string]: T },
  itemToRemove: string
): { [key: string]: T } => {
  const { [itemToRemove]: deletedItem, ...objectWithoutDeletedProp } = state;
  return objectWithoutDeletedProp;
};

export const removeLanguage = <T>(
  values: { [key: string]: T },
  lang: string
): { [key: string]: T } => {
  const langToRemove = Object.keys(values).find(l => l !== lang);
  return removeItem(values, langToRemove);
};

export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean;

const defaultShouldUpdate = <T>(a?: T, b?: T) => a !== b;

/**
 * A Hook to return the previous state.
 * @param state - loaded page namespaces
 * @param lang - current language
 * @param _shouldUpdate
 * @returns - persisted page namespaces for the prior page
 */

export const usePreviousNamespace = <T>(
  state: T,
  lang: string,
  _shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate
): T | undefined => {
  /**
   * Use useRef to persist the value; it's the least expensive built-in hook.
   * Initialize current as an empty object.
   */
  const prevRef = useRef<{ [key: string]: T }>({});
  const curRef = useRef<{ [key: string]: T }>({});

  /**
   * TODO:
   * Implement a shallow comparison of when and when not to update e.g.
   * if (shouldUpdate(curRef.current[lang], state)) {
   *    => update
   * }
   */

  prevRef.current[lang] = curRef.current[lang];
  curRef.current[lang] = state;

  /**
   * Remove outdated lang from both previous and current references.
   */
  useEffect(() => {
    prevRef.current = removeLanguage(prevRef.current, lang);
    curRef.current = removeLanguage(curRef.current, lang);
  }, [lang]);

  return prevRef.current[lang];
};
