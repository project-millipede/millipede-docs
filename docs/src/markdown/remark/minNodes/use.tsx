import { Typography } from '@material-ui/core';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';
import { TypographyProps } from '@material-ui/core/Typography';
import React from 'react';
import remarkParse from 'remark-parse';
import remarkToReact from 'remark-react';
import remarkSlug from 'remark-slug';
import unified from 'unified';

import attacher from '.';

const renderHeading = (variant: ThemeStyle) => (props: TypographyProps) => {
  return (
    <Typography component='a' variant={variant}>
      {props.children}
    </Typography>
  );
};

const processor = unified()
  .use(remarkParse)
  .use(remarkSlug)
  .use(attacher)
  .use(remarkToReact, {
    remarkReactComponents: {
      a: renderHeading('h5')
    }
  });

export default processor;
