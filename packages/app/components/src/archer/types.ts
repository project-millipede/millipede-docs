import { CSSProperties, MutableRefObject, ReactElement, ReactNode } from 'react';

import { AnchorPosition } from './types-private';

export interface SyncHandle {
  sync?: (y: number) => void;
  select?: () => void;
  unSelect?: () => void;
}

export interface LineStyle {
  strokeColor?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export interface Relation {
  targetId: string;
  targetAnchor: AnchorPosition;
  sourceAnchor: AnchorPosition;
  optionalTargetAnchor?: AnchorPosition;
  optionalSourceAnchor?: AnchorPosition;
  label?: ReactNode;
  style?: LineStyle;
}

export type RenderFnParameter = {
  ref: MutableRefObject<HTMLElement>;
  dynamicRef?: MutableRefObject<SyncHandle>;
};

export type RenderFn = ({ ref, dynamicRef }: RenderFnParameter) => JSX.Element;

export interface ArcherElementProps {
  id: string; // identify the Archer Element.
  relations?: Array<Relation>;
  style?: CSSProperties;
  className?: string;
  label?: ReactNode;
  children?: ReactElement;
  render?: RenderFn;
  isInteractive?: boolean;
}
