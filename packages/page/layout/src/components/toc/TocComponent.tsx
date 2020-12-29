import React, { useMemo } from 'react';

import { generateToc, TocProps } from './Toc.svc';

export const TocComponent = ({ content }: TocProps) => {
  const toc = useMemo(() => {
    return generateToc({ content }).result;
  }, [content]);

  return <>{toc}</>;
};
