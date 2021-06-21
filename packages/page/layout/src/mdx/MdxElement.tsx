import { Components as ComponentUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { Typography } from '@material-ui/core';
import { Share } from '@page/components';
import { Components } from '@page/layout';
import React, { FC, ReactNode } from 'react';

const {
  Media: { Media }
} = ComponentUtils;

interface MDXProps {
  id: string;
  children: ReactNode;
}

interface MDXRenderProps {
  disableShare?: boolean;
  meta?: PageTypes.ContentMetaData;
  isMobile?: boolean;
}

export const h1 = ({ disableShare, meta }: MDXRenderProps) => {
  return ({ children }: MDXProps) => {
    return (
      <div style={{ display: 'flex' }}>
        <Typography variant='h1'>{children}</Typography>
        {!disableShare && <Share {...meta} />}
      </div>
    );
  };
};

export const h2 = ({ children, id }: MDXProps) => {
  return (
    <>
      <Media lessThan='sm'>
        <Typography variant='h2'>{children}</Typography>
      </Media>
      <Media greaterThanOrEqual='sm'>
        <Components.Head.InteractiveHead variant='h2' id={id}>
          {children}
        </Components.Head.InteractiveHead>
      </Media>
    </>
  );
};
export const h3 = ({ children, id }: MDXProps) => {
  return (
    <>
      <Media lessThan='sm'>
        <Typography variant='h3'>{children}</Typography>
      </Media>
      <Media greaterThanOrEqual='sm'>
        <Components.Head.InteractiveHead variant='h3' id={id}>
          {children}
        </Components.Head.InteractiveHead>
      </Media>
    </>
  );
};
export const h4 = ({ children, id }: MDXProps) => {
  return (
    <>
      <Media lessThan='sm'>
        <Typography variant='h4'>{children}</Typography>
      </Media>
      <Media greaterThanOrEqual='sm'>
        <Components.Head.InteractiveHead variant='h4' id={id}>
          {children}
        </Components.Head.InteractiveHead>
      </Media>
    </>
  );
};

export const h5: FC<MDXProps> = ({ children }) => (
  <Typography variant='h5'>{children}</Typography>
);
export const h6: FC<MDXProps> = ({ children }) => (
  <Typography variant='h6'>{children}</Typography>
);
