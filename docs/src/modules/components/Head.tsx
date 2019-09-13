import { WithRouterProps } from 'next/dist/client/with-router';
import NextHead from 'next/head';
import { withRouter } from 'next/router';
import React from 'react';

interface OProps extends WithRouterProps {
  description?: string;
  title?: string;
}

type Props = OProps & WithRouterProps;

function Head(props: Props) {
  const { title = '' } = props;

  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
}

export default withRouter(Head);
