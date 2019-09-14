import { Omit } from '@material-ui/core';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

type ComponentWorkaroundProps<P extends {}> = P & {
  component?: React.ComponentType<P>;
};

const NextLinkMuiLink = React.forwardRef<
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
