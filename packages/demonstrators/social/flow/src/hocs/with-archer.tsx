import { Archer } from '@app/components';
import React, { ComponentType } from 'react';

import { DockItemArcherProps, DockItemProps, DockSliceArcherProps } from '../types';

export const withArcher = (Comp: ComponentType<DockItemProps>) => {
  return (props: DockItemArcherProps | DockSliceArcherProps) => {
    const { id, relations, isInteractive, ...rest } = props;
    return (
      <Archer.ArcherElement
        id={id}
        relations={relations}
        isInteractive={isInteractive}
        render={renderProps => {
          return <Comp {...renderProps} {...rest} />;
        }}
      />
    );
  };
};
