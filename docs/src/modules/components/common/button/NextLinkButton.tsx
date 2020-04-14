import { Omit } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { LinkProps as NextLinkProps } from 'next/link';
import React, { ComponentType, forwardRef } from 'react';

type ComponentWorkaroundProps<P extends {}> = P & {
  component?: ComponentType<P>;
};

const NextLinkButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'component'> & ComponentWorkaroundProps<NextLinkProps>
>(({ children, ...props }, ref) => {
  return (
    <Button {...props} ref={ref}>
      {children}
    </Button>
  );
});

export default NextLinkButton;
