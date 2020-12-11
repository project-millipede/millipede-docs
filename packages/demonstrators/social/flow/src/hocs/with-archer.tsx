import { Archer } from '@app/components';
import React, { ComponentType } from 'react';

import { DockItemArcherProps, DockItemProps, DockSliceArcherProps } from '../types';

export const withArcher = (Comp: ComponentType<DockItemProps>) => {
  return (props: DockItemArcherProps | DockSliceArcherProps) => {
    const { id, relations, ...rest } = props;
    return (
      <Archer.ArcherElement
        id={id}
        relations={relations}
        render={renderProps => {
          return <Comp {...renderProps} {...rest} />;
        }}
      />
    );
  };
};
