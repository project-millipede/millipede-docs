import { MutableRefObject } from 'react';

import { Point } from './Point';
import { TAnchorPosition } from './types';

export interface IPoint {
  x: number;
  y: number;
}
export interface ISize {
  width: number;
  heigth: number;
}

interface DirectionVector {
  arrowX: -1 | 1 | 0;
  arrowY: -1 | 1 | 0;
}

const rectToPoint = (rect: DOMRect) => {
  return new Point(rect.left, rect.top);
};

const computeCoordinatesFromAnchorPosition = (
  anchorPosition: TAnchorPosition,
  rect: DOMRect
) => {
  switch (anchorPosition) {
    case 'top':
      return rectToPoint(rect).add(new Point(rect.width / 2, 0));
    case 'bottom':
      return rectToPoint(rect).add(new Point(rect.width / 2, rect.height));
    case 'left':
      return rectToPoint(rect).add(new Point(0, rect.height / 2));
    case 'right':
      return rectToPoint(rect).add(new Point(rect.width, rect.height / 2));
    case 'middle':
      return rectToPoint(rect).add(new Point(rect.width / 2, rect.height / 2));
    default:
      return new Point(0, 0);
  }
};

export const getParentCoordinates = (ref: any): Point => {
  if (ref && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    return rectToPoint(rect);
  }
  return new Point(0, 0);
};

export const computeArrowPointAccordingToArrowHead = (
  end: IPoint,
  arrowLength: number,
  strokeWidth: number,
  endingAnchorOrientation: TAnchorPosition
) => {
  const { arrowX, arrowY } = computeArrowDirectionVector(
    endingAnchorOrientation
  );

  return {
    x: end.x + (arrowX * arrowLength * strokeWidth) / 2,
    y: end.y + (arrowY * arrowLength * strokeWidth) / 2
  };
};

export const getCoordinatesFromAnchorPosition = (
  position: TAnchorPosition,
  parentCoordinates: Point,
  ref: MutableRefObject<HTMLElement>
) => {
  if (ref && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const absolutePosition = computeCoordinatesFromAnchorPosition(
      position,
      rect
    );
    return absolutePosition.substract(parentCoordinates);
  }
  return new Point(0, 0);
};

export const computeArrowDirectionVector = (
  anchorOrientation: TAnchorPosition
): DirectionVector => {
  switch (anchorOrientation) {
    case 'left':
      return { arrowX: -1, arrowY: 0 };
    case 'right':
      return { arrowX: 1, arrowY: 0 };
    case 'top':
      return { arrowX: 0, arrowY: -1 };
    case 'bottom':
      return { arrowX: 0, arrowY: 1 };
    default:
      return { arrowX: 0, arrowY: 0 };
  }
};

export const computeStartAnchorPosition = (
  start: IPoint,
  end: IPoint,
  startAnchorPosition: TAnchorPosition
) => {
  if (startAnchorPosition === 'top' || startAnchorPosition === 'bottom') {
    return {
      x: start.x,
      y: start.y + (end.y - start.y) / 2
    };
  }
  if (startAnchorPosition === 'left' || startAnchorPosition === 'right') {
    return {
      x: start.x + (end.x - start.x) / 2,
      y: start.y
    };
  }

  return { x: start.x, y: start.y };
};

export const computeEndAnchorPosition = (
  start: IPoint,
  end: IPoint,
  endAnchorPosition: TAnchorPosition
) => {
  if (endAnchorPosition === 'top' || endAnchorPosition === 'bottom') {
    return {
      x: end.x,
      y: end.y - (end.y - start.y) / 2
    };
  }
  if (endAnchorPosition === 'left' || endAnchorPosition === 'right') {
    return {
      x: end.x - (end.x - start.x) / 2,
      y: end.y
    };
  }

  return { x: end.x, y: end.y };
};

export const computePath = (
  startPoint: IPoint, // startPointWithArrow: IPoint,
  endPointWithArrow: IPoint,
  computedStartPosition: IPoint,
  computedEndPosition: IPoint
): string => {
  return (
    `M${startPoint.x},${startPoint.y} ` +
    `${computedStartPosition.x},${computedStartPosition.y} ${computedEndPosition.x},${computedEndPosition.y} ` +
    `${endPointWithArrow.x},${endPointWithArrow.y}`
  );
};

export const computeLabelDimensions = (
  startPoint: IPoint,
  endPointWithArrow: IPoint
) => {
  const xOffset = Math.abs(endPointWithArrow.x - startPoint.x) / 2;
  const centerX =
    endPointWithArrow.x < startPoint.x
      ? endPointWithArrow.x + xOffset
      : endPointWithArrow.x - xOffset;

  const yOffset = Math.abs(endPointWithArrow.y - startPoint.y) / 2;
  const centerY =
    endPointWithArrow.y < startPoint.y
      ? endPointWithArrow.y + yOffset
      : endPointWithArrow.y - yOffset;

  return {
    centerX,
    centerY
  };
};
