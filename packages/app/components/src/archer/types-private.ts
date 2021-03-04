import { CSSProperties, ReactNode, SVGProps } from 'react';

export type AnchorPosition = 'top' | 'bottom' | 'left' | 'right' | 'middle';

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
  svgElementProps?: SVGProps<SVGSVGElement>;

  className?: string;

  /**
   * Optional number for space between element and start/end of stroke
   */
  offset?: number;

  elementStyle?: CSSProperties;

  children?: ReactNode;
}

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
