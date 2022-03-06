import { Components as RenderComponents } from '@app/render-utils';
import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Components } from '@page/layout';
import React, { FC } from 'react';

const {
  Media: { Media }
} = RenderComponents;

interface InteractiveHeadProps {
  // id generated through slug
  id?: string;
}

export const h2: FC<InteractiveHeadProps> = ({ children, id }) => {
  return (
    <>
      <Media lessThan='md'>
        {(className, renderChildren) => {
          return (
            <Typography
              variant='h2'
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
              variant='h2'
              id={id}
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

export const h3: FC<InteractiveHeadProps> = ({ children, id }) => {
  return (
    <>
      <Media lessThan='md'>
        {(className, renderChildren) => {
          return (
            <Typography
              variant='h3'
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
              variant='h3'
              id={id}
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

export const h4: FC<InteractiveHeadProps> = ({ children, id }) => {
  return (
    <>
      <Media lessThan='md'>
        {(className, renderChildren) => {
          return (
            <Typography
              variant='h4'
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
              variant='h4'
              id={id}
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

export const h1: FC = ({ children }) => (
  <Typography variant='h1'>{children}</Typography>
);

export const h5: FC = ({ children }) => (
  <Typography variant='h5'>{children}</Typography>
);
export const h6: FC = ({ children }) => (
  <Typography variant='h6'>{children}</Typography>
);

export const blockquote = styled('blockquote')(({ theme }) => ({
  borderLeft: `${theme.spacing(0.5)} solid ${blue[500]}`,
  backgroundColor: 'rgb(33, 150, 243, 0.2)',
  margin: theme.spacing(3, 0),
  '& p': {
    margin: 0,
    padding: theme.spacing(2)
  }
}));
