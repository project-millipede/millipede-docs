import vfile, { VFile } from 'vfile';

import { MdElementProps } from './MdElement';
import { generateProcessor } from './MdProcessor';

export const generateMdElement = async ({ content }: MdElementProps): Promise<VFile> => {
  const processor = generateProcessor();
  const file: VFile = vfile(content);
  const result = await processor.process(file);
  return result;
};
