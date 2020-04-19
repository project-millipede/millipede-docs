import { VFile, VFileCompatible } from 'vfile';

import { generateProcessor } from './TocProcessor';

type VFileExtended = VFile & { result?: unknown };

export interface TocProps {
  content?: VFileCompatible;
}

export const generateToc = ({ content }: TocProps): VFileExtended => {
  const processor = generateProcessor();
  const file = processor.processSync(content);
  return file;
};
