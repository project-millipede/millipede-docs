import { Archer, ArcherTypes } from '@app/archer';
import { ComponentType } from 'react';

import { DockItemProps } from '../components/flow/DockItem';
import { DockSliceProps } from '../components/flow/DockSlice';

const { ArcherElement } = Archer;

export type DockItemArcherProps = DockItemProps &
  ArcherTypes.ArcherElementProps;

export type DockSliceArcherProps = DockSliceProps &
  ArcherTypes.ArcherElementProps;

export const withArcher = (Comp: ComponentType<DockItemProps>) => {
  return (props: DockItemArcherProps | DockSliceArcherProps) => {
    const { id, relations, isInteractive, ...rest } = props;
    return (
      <ArcherElement
        id={id}
        relations={relations}
        isInteractive={isInteractive}
      >
        <Comp {...rest} />
      </ArcherElement>
    );
  };
};
