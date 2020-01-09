import React from 'react';

export interface ContentViewProps extends React.Props<any> {}

const ContentView: React.FC<ContentViewProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ContentView;
