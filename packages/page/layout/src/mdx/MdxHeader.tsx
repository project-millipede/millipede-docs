import { Components as RenderComponents } from '@app/render-utils';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { Components } from '@page/layout';
import React, { FC, memo } from 'react';

const {
  Media: { Media }
} = RenderComponents;

export type HeaderProps = {
  // id generated through slug
  id: string;
  variant: Variant;
  children: string;
};

const Header: FC<HeaderProps> = ({ variant, id, children }) => {
  return (
    <>
      <Media lessThan='md'>
        {(className, renderChildren) => {
          return (
            <Typography
              variant={variant}
              className={className}
              suppressHydrationWarning={!renderChildren}
            >
              {renderChildren && children}
            </Typography>
          );
        }}
      </Media>
      <Media greaterThanOrEqual='md'>
        {(className, renderChildren) => {
          return (
            <Components.Head.InteractiveHead
              id={id}
              variant={variant}
              renderChildren={renderChildren}
              className={className}
            >
              {children}
            </Components.Head.InteractiveHead>
          );
        }}
      </Media>
    </>
  );
};

export default memo(Header);
