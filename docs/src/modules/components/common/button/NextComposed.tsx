import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { createElement, forwardRef } from 'react';

const NextComposed = forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ children, ...props }, ref) => {
    const { as, href, prefetch, ...other } = props;

    const anchorElement = createElement('a', {
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
