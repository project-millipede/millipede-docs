import { Translate } from 'next-translate';

export const translateObject = <T>(t: Translate, field: string): Array<T> => {
  const topics = t<Array<T>>(
    field,
    {},
    {
      returnObjects: true
    }
  );
  if (Array.isArray(topics)) {
    return topics;
  }
  return [];
};
