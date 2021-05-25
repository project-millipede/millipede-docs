import { MotionProps } from 'framer-motion';
import { ComponentType } from 'react';

import { TPosition } from './View';

export interface PartialViewElement {
  id: string; // layoutId,
  parentId?: string; // programmatical determination before before initial state,
  label?: string;
  previousParentId?: string;
  update?: boolean;
  siblingOf?: string;
  siblings?: Array<PartialViewElement>;
  constellation?: Array<string>;
  position?: TPosition;
}

export type FlattenedPartialViewElement = Omit<
  PartialViewElement,
  'constellation'
> & {
  isParent?: boolean;
};

export interface ViewElementProps extends MotionProps {}

export interface TViewElement extends PartialViewElement {
  key: string;
  backgroundColor?: string;
  component: ComponentType<ViewElementProps>;
}
