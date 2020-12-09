import { Archer } from '@app/components';
import React, { ComponentType } from 'react';

import { InteractionItemArcherProps, InteractionItemProps, InteractionSliceArcherProps } from '../types';

export const withArcher = (Comp: ComponentType<InteractionItemProps>) => {
  return (props: InteractionItemArcherProps | InteractionSliceArcherProps) => {
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
