import { useCallback, useEffect, useState } from 'react';
import React from 'react';

// import { processAndRender } from '../processAndRender';

export interface TOCProps {
  content?: string;
  activeState: string;
  callback: (hash: string) => void;
}

interface AnchorObject {
  href: string;
  title: string;
}

const TOCComponent = ({ content, activeState, callback }: TOCProps) => {
  const [toc, setToc] = useState("");

  // useEffect(() => {
  //   const generateMDX = async () => {
  //     const processor = await processAndRender(callback, activeState);
  //     const file: VFile = vfile(content);
  //     const result = await processor.process(file);
  //     setToc(result.contents as string);
  //   };
  //   generateMDX();
  // }, [content, activeState]);

  return <>{toc}</>;
};

export default TOCComponent;
