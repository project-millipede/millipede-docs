import { VFile, VFileCompatible } from 'vfile';

import { generateProcessor } from './TocProcessor';

type VFileExtended = VFile & { result?: unknown };

export interface TocProps {
  content?: VFileCompatible;
  activeState: Set<string>;
}

export const generateToc = async ({
  content,
  activeState
}: TocProps): Promise<VFileExtended> => {
  const processor = generateProcessor(activeState);
  const file = await processor.process(content);
  return file;
};
