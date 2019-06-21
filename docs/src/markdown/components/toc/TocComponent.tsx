import React, { useEffect, useState } from 'react';

import { generateToc } from './Toc.svc';

export interface TocProps {
  content?: string;
  activeState: Set<string>;
  scrollToLink?: (href: string) => void;
}

const TocComponent = ({ content, activeState, scrollToLink }: TocProps) => {
  const [toc, setToc] = useState('');

  useEffect(() => {
    generateToc({ content, activeState, scrollToLink }).then(result =>
      setToc(result.contents as string)
    );
  }, [content, activeState]);

  return <>{toc}</>;
};

export default TocComponent;
