import React, { FC, ReactNode } from 'react';

export interface ContentViewProps {
  children: ReactNode;
}

const ContentView: FC<ContentViewProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ContentView;
