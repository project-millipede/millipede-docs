import React, { useEffect, useState } from 'react';

import { generateToc, TocProps } from './Toc.svc';

const TocComponent = ({ content, activeState }: TocProps) => {
  const [toc, setToc] = useState('');

  useEffect(() => {
    generateToc({ content, activeState }).then(result =>
      setToc(result.contents as string)
    );
  }, [content, activeState.size]);

  return <>{toc}</>;
};

export default TocComponent;
