import { RouterUtils } from '@app/utils';
import { Toc, TocEntry } from '@stefanprobst/remark-extract-toc';
import { VFile } from 'vfile';

import { generateProcessor } from './TocProcessor';

export type VFileExtended = VFile & {
  data: { toc?: Toc };
};

export const generateToc = async (content: string): Promise<VFileExtended> => {
  const processor = generateProcessor();
  const file: Promise<VFileExtended> = processor.process(content);
  return file;
};

const omitDepth = [1, 5, 6];

export const filterToc = (toc: Toc) => {
  const flattenedToc = RouterUtils.flatten<TocEntry>(toc, 'children');
  const filteredToc = flattenedToc.filter(
    tocItem => !omitDepth.includes(tocItem.depth)
  );
  return filteredToc;
};
