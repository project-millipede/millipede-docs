import fg from 'fast-glob';

import { idToPathParams } from './getStaticPathsHelper';
import { getPageDirectory } from './pages';

export const getPath = async (pageType: string) => {
  const sourceDirectory = getPageDirectory(pageType);

  const files = await fg(['**/*.{md,mdx}'], { cwd: sourceDirectory });

  const paths = files.map(file => idToPathParams(file));
  return paths;
};
