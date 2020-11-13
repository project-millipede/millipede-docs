import React, { ComponentType } from 'react';

import { ArcherElement } from '../../../../../../../docs/src/modules/components/archer';
import { InteractionItemArcherProps, InteractionItemProps, InteractionSliceArcherProps } from './types';

export const withArcher = (Comp: ComponentType<InteractionItemProps>) => {
  return (props: InteractionItemArcherProps | InteractionSliceArcherProps) => {
    const { id, relations, ...rest } = props;
    return (
      <ArcherElement
        id={id}
        relations={relations}
        render={renderProps => {
          return <Comp {...renderProps} {...rest} />;
        }}
      />
    );
  };
};
