import vfile, { VFile } from 'vfile';

import { generateProcessor } from './TocProcessor';

export interface TocProps {
  content?: string;
  activeState: Set<string>;
  scrollToLink?: (href: string) => void;
}

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
