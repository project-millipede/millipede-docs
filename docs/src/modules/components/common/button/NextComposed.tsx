// import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import React from 'react';

import { LinkProps as NextLinkProps } from '../../../../../../src/typings/custom';

const NextComposed = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ children, ...props }, ref) => {
    const { as, href, prefetch, ...other } = props;

    const anchorElement = React.createElement("a", {
      ...other,
      children,
      ref
    });

    return (
      <NextLink href={href} prefetch={prefetch} as={as}>
        {anchorElement}
      </NextLink>
    );
  }
);

export default NextComposed;
