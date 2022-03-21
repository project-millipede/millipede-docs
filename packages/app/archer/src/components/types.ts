import { CSSProperties, MutableRefObject, ReactElement, ReactNode } from 'react';

// export type AnchorPosition = 'top' | 'bottom' | 'left' | 'right' | 'middle';

export const AnchorPosition = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  middle: 'middle'
} as const;

export type TAnchorPosition =
  typeof AnchorPosition[keyof typeof AnchorPosition];

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
  targetAnchor: TAnchorPosition;
  sourceAnchor: TAnchorPosition;
  optionalTargetAnchor?: TAnchorPosition;
  optionalSourceAnchor?: TAnchorPosition;
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
  isMobile?: boolean;
  isInteractive?: boolean;
}
