import React, { FC } from 'react';

import { ArcherSurface } from './ArcherSurface';
import { RefProvider } from './context/RefProvider';
import { TransitionProvider } from './context/TransitionProvider';
import { ArcherContainerProps } from './types';

export const ArcherContainer: FC<ArcherContainerProps> = ({
  children,
  ...rest
}) => {
  return (
    <RefProvider>
      <TransitionProvider>
        <ArcherSurface {...rest}>{children}</ArcherSurface>
      </TransitionProvider>
    </RefProvider>
  );
};
