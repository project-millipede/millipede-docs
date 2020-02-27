import { MathUtil } from '../../../../docs/src/modules/utils';

export const generateImageURL = (width = 300, height = 200) => {
  const random = MathUtil.generateRandomInteger(0, 1024);
  return `https://picsum.photos/id/${random}/${width}/${height}`;
};
