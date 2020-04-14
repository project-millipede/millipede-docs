import { Omit } from '@material-ui/core';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import { LinkProps as NextLinkProps } from 'next/link';
import React, { ComponentType, forwardRef } from 'react';

type ComponentWorkaroundProps<P extends {}> = P & {
  component?: ComponentType<P>;
};

const NextLinkMuiLink = forwardRef<
  HTMLButtonElement,
  Omit<MuiLinkProps, 'component'> & ComponentWorkaroundProps<NextLinkProps>
>(({ children, ...props }, ref) => {
  return (
    <MuiLink {...props} ref={ref}>
      {children}
    </MuiLink>
  );
});

export default NextLinkMuiLink;
