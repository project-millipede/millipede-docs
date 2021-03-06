import { MathUtil } from '@app/utils';

export const generateImageURL = (width = 300, height = 200) => {
  const random = MathUtil.generateRandomInteger(256);
  return `https://picsum.photos/id/${random}/${width}/${height}`;
};
