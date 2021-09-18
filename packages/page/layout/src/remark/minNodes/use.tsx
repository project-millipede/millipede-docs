import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { TypographyProps } from '@material-ui/core/Typography';
import React, { createElement } from 'react';
import remarkParse from 'remark-parse';
import remarkToReact from 'remark-react';
import remarkSlug from 'remark-slug';
import { unified } from 'unified';

import attacher from '.';

const renderHeading = (variant: Variant) => (props: TypographyProps) => {
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
    createElement,
    remarkReactComponents: {
      a: renderHeading('h5')
    }
  } as any);

export default processor;
