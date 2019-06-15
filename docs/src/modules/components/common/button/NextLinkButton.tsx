import { Omit } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

import { LinkProps as NextLinkProps } from '../../../../../../src/typings/link';

// import { LinkProps as NextLinkProps } from "next/link";
type ComponentWorkaroundProps<P extends {}> = P & {
  component?: React.ComponentType<P>;
};

const NextLinkButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "component"> & ComponentWorkaroundProps<NextLinkProps>
>(({ children, ...props }, ref) => {
  return (
    <Button {...props} ref={ref}>
      {children}
    </Button>
  );
});

export default NextLinkButton;
