import { CSSProperties, ReactNode, SVGProps } from 'react';

export type AnchorPosition = 'top' | 'bottom' | 'left' | 'right' | 'middle';

export interface ArrowStyle {
  arrowLength?: number;
  arrowThickness?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export interface ArcherSurfaceProps {
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

  style?: CSSProperties;

  /**
   * Style of the SVG container element. Useful if you want to add a z-index to your SVG container to draw the arrows under your elements, for example.
   */
  svgElementProps?: SVGProps<SVGSVGElement>;

  className?: string;

  elementStyle?: CSSProperties;

  children?: ReactNode;
}

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
