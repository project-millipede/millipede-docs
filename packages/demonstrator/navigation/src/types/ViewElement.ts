import { ComponentType } from 'react';

import { TPosition } from './View';

export interface PartialViewElement {
  id: string;
  label?: string;
  parentId?: string;
  position?: TPosition;
  previousParentId?: string;
  previousPosition?: TPosition;
  siblings?: Array<PartialViewElement>; // not in use
}

export type FlattenedPartialViewElement = PartialViewElement & {
  isParent?: boolean;
};

export interface BaseViewElementProps {
  viewId: string;
  render?: (parentId: string, isMobile: boolean) => JSX.Element;
}

export interface ViewElementProps {
  parentId: string;
  isMobile: boolean;
}

export interface TViewElement extends PartialViewElement {
  key: string;
  component: ComponentType<ViewElementProps>;
  baseComponent: ComponentType<BaseViewElementProps>;
}
