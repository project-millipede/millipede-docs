import { VFile, VFileCompatible } from 'vfile';

import { generateProcessor } from './MdProcessor';

type VFileExtended = VFile & { result?: unknown };

export interface MdElementProps {
  content: VFileCompatible;
}

export const generateMdElement = async ({
  content
}: MdElementProps): Promise<VFileExtended> => {
  const processor = generateProcessor();
  const file = await processor.process(content);
  return file;
};
