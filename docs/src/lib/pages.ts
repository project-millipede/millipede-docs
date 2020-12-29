import { get } from 'lodash';
import path from 'path';

export const sourceDirectories = {
  docs: 'docs/src/pages'
};

export const getPageDirectory = (pageType: string) => {
  return path.resolve(process.cwd(), get(sourceDirectories, pageType));
};
