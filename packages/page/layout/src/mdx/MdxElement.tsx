import { RenderUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { Typography } from '@material-ui/core';
import { Components } from '@page/layout';
import dynamic from 'next/dynamic';
import React, { FC, ReactNode } from 'react';

const Share = dynamic(() =>
  import('@page/components').then(module => module.Share)
);

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
        {!disableShare && RenderUtils.isBrowser() ? <Share {...meta} /> : null}
      </div>
    );
  };
};

export const h2 = ({ isMobile = true }: MDXRenderProps) => {
  return ({ children, id }: MDXProps) => {
    return isMobile ? (
      <Typography variant='h2'>{children}</Typography>
    ) : (
      <Components.Head.InteractiveHead variant='h2' id={id}>
        {children}
      </Components.Head.InteractiveHead>
    );
  };
};

export const h3 = ({ isMobile = true }: MDXRenderProps) => {
  return ({ children, id }: MDXProps) => {
    return isMobile ? (
      <Typography variant='h3'>{children}</Typography>
    ) : (
      <Components.Head.InteractiveHead variant='h3' id={id}>
        {children}
      </Components.Head.InteractiveHead>
    );
  };
};

export const h4 = ({ isMobile = true }: MDXRenderProps) => {
  return ({ children, id }: MDXProps) => {
    return isMobile ? (
      <Typography variant='h4'>{children}</Typography>
    ) : (
      <Components.Head.InteractiveHead variant='h4' id={id}>
        {children}
      </Components.Head.InteractiveHead>
    );
  };
};

export const h5: FC<MDXProps> = ({ children }) => (
  <Typography variant='h5'>{children}</Typography>
);
export const h6: FC<MDXProps> = ({ children }) => (
  <Typography variant='h6'>{children}</Typography>
);
