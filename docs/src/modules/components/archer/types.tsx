import { Component, CSSProperties, MutableRefObject, ReactElement, ReactNode, RefCallback } from 'react';

import { SelectHandles } from './CustomBoxForward';

export type AnchorPosition = 'top' | 'bottom' | 'left' | 'right' | 'middle';

export interface Relation {
  targetId: string;
  targetAnchor: AnchorPosition;
  sourceAnchor: AnchorPosition;
  label?: ReactNode;
  style?: ArrowStyle;
}

export interface ArrowStyle {
  strokeColor?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  arrowLength?: number;
  arrowThickness?: number;
  noCurves?: boolean;
}

export interface ArcherContainerProps {
  /**
   * A size in px
   */
  arrowLength?: number;

  /**
   * A size in px
   */
  arrowThickness?: number;

  /**
   * A color string
   *
   * @example '#ff0000'
   */
  strokeColor?: string;

  /**
   * A size in px
   */
  strokeWidth?: number;

  /**
   * A string representing an array of sizes
   * See https://www.w3schools.com/graphics/svg_stroking.asp
   */
  strokeDasharray?: string;

  /**
   * Set this to true if you want angles instead of curves
   */
  noCurves?: boolean;

  style?: CSSProperties;

  /**
   * Style of the SVG container element. Useful if you want to add a z-index to your SVG container to draw the arrows under your elements, for example.
   */
  svgContainerStyle?: CSSProperties;

  className?: string;

  /**
   * Optional number for space between element and start/end of stroke
   */
  offset?: number;

  elementStyle?: CSSProperties;

  children?: ReactNode;
}

export class ArcherContainer extends Component<ArcherContainerProps> {
  /**
   * Use this to recompute all the arrow positions. Useful if arrows do not properly rerender
   * after the viewport or some elements moved.
   */
  refreshScreen: () => void;
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

// different set of types

export type RelationType = {
  targetId: string;
  targetAnchor: AnchorPosition;
  sourceAnchor: AnchorPosition;
  label?: ReactNode;
  style?: ArrowStyle;
};

export type EntityRelationType = {
  id: string;
  anchor: AnchorPosition;
};

export type SourceToTargetType = {
  source: EntityRelationType;
  target: EntityRelationType;
  label?: ReactNode;
  style?: ArrowStyle;
};
