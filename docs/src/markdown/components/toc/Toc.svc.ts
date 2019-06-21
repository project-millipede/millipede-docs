import vfile, { VFile } from 'vfile';

import { TocProps } from './TocComponent';
import { generateProcessor } from './TocProcessor';

export const generateToc = async ({
  content,
  activeState,
  scrollToLink
}: TocProps): Promise<VFile> => {
  const processor = generateProcessor(activeState, scrollToLink);
  const file: VFile = vfile(content);
  const result = await processor.process(file);
  return result;
};
