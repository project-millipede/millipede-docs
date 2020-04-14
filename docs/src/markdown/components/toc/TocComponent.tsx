import React, { useEffect, useState } from 'react';

import { generateToc, TocProps } from './Toc.svc';

const TocComponent = ({ content, activeState }: TocProps) => {
  const [toc, setToc] = useState<unknown>();

  useEffect(() => {
    generateToc({ content, activeState }).then(file => setToc(file.result));
  }, [content, activeState.size]);

  return <>{toc}</>;
};

export default TocComponent;
