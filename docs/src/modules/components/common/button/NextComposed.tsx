import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

const NextComposed = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ children, ...props }, ref) => {
    const { as, href, prefetch, ...other } = props;

    const anchorElement = React.createElement('a', {
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
