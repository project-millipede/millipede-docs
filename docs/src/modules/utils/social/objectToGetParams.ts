import { SocialMediaURIPathParams } from '../../../../../src/typings/share/social';

const encodeURL = (o: SocialMediaURIPathParams) => (
  key: string,
  index: number,
  _array: Array<string>
) => {
  if (index === 0) {
    return `?${key}=${encodeURIComponent(o[key])}`;
  }
  return `${key}=${encodeURIComponent(o[key])}`;
};

export const objectToGetParams = (object: SocialMediaURIPathParams) => {
  return Object.keys(object)
    .filter(key => !!object[key])
    .map(encodeURL(object))
    .join('&');
};
