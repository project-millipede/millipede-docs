import React, { useEffect, useState } from 'react';
import { VFileContents } from 'vfile';

import { generateToc, TocProps } from './Toc.svc';

const TocComponent = ({ content, activeState }: TocProps) => {
  const [toc, setToc] = useState<VFileContents>();

  useEffect(() => {
    generateToc({ content, activeState }).then(result =>
      setToc(result.contents)
    );
  }, [content, activeState.size]);

  return <>{toc}</>;
};

export default TocComponent;
