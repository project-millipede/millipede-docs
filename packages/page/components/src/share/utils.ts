import { SocialMediaURIPathParams } from './types';

const encodeURL = (object: SocialMediaURIPathParams) => (
  key: string,
  index: number,
  _array: Array<string>
) => {
  if (index === 0) {
    return `?${key}=${encodeURIComponent(object[key])}`;
  }
  return `${key}=${encodeURIComponent(object[key])}`;
};

export const objectToGetParams = (object: SocialMediaURIPathParams) => {
  return Object.keys(object)
    .filter(key => !!object[key])
    .map(encodeURL(object))
    .join('&');
};
