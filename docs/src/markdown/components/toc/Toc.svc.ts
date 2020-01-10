import vfile, { VFile } from 'vfile';

import { generateProcessor } from './TocProcessor';

export interface TocProps {
  content?: string;
  activeState: Set<string>;
}

export const generateToc = async ({
  content,
  activeState
}: TocProps): Promise<VFile> => {
  const processor = generateProcessor(activeState);
  const file: VFile = vfile(content);
  const result = await processor.process(file);
  return result;
};
