import { Typography } from '@material-ui/core';
import React from 'react';
import { Element } from 'react-scroll';

interface HeadProps extends React.Props<any> {
  // id generated through slug
  id: string;
  component: 'h2' | 'h3';
}

const InderaktiveHeadForLoader = ({ id, component, children }: HeadProps) => {
  return (
    <Element name={id}>
      <Typography variant={component}>{children}</Typography>
    </Element>
  );
};

export default InderaktiveHeadForLoader;
