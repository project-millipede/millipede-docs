/* eslint-disable import/no-named-as-default */
import React, { FC } from 'react';

import { withForwardRef } from '../../../../../src/components/layout/grid/animation/framer/components/with-forward-ref';
import ArcherSurface from './ArcherSurface';
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

export default withForwardRef<HTMLElement, ArcherContainerProps>(
  ArcherContainer
);
