import React, { useMemo } from 'react';

import { generateToc, TocProps } from './Toc.svc';

const TocComponent = ({ content }: TocProps) => {
  const toc = useMemo(() => {
    return generateToc({ content }).result;
  }, [content]);

  return <>{toc}</>;
};

export default TocComponent;
