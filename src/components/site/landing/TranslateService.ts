import _ from 'lodash';
import { TFunction } from 'next-i18next-serverless';

export const translateContent = <T>(t: TFunction, field: string): Array<T> => {
  const topics = t<Array<T>>(field, {
    returnObjects: true
  });
  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};
