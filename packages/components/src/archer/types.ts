import { CSSProperties, MutableRefObject, ReactElement, ReactNode, RefCallback } from 'react';

export interface SelectHandles {
  select: () => void;
  unSelect: () => void;
}

export interface Relation {
  targetId: string;
  targetAnchor: any;
  sourceAnchor: any;
  label?: ReactNode;
  style?: any;
}

export type RenderFnSingleParameter = {
  ref: MutableRefObject<HTMLDivElement> | RefCallback<HTMLDivElement>;
};

export type RenderSingleFn = ({ ref }: RenderFnSingleParameter) => JSX.Element;

export type RenderFnParameter = {
  ref: MutableRefObject<HTMLElement>;
  dynamicRef: MutableRefObject<SelectHandles>;
};

export type RenderFn = ({ ref, dynamicRef }: RenderFnParameter) => JSX.Element;

export interface ArcherElementProps {
  /**
   * The id that will identify the Archer Element. Should only contain alphanumeric characters and standard characters that you can find in HTML ids.
   */
  id: string;
  relations?: Array<Relation>;
  style?: CSSProperties;
  children?: ReactElement;
  render?: RenderFn;
}
