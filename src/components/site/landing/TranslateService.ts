import _ from 'lodash';
import { Translate } from 'next-translate';

export const translateContent = <T>(t: Translate, field: string): Array<T> => {
  const topics = t<Array<T>>(field, {}, {
    returnObjects: true
  });

  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};
