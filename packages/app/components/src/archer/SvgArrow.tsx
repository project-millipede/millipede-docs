/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
import React, { ReactNode } from 'react';

import { Point } from './Point';
import { AnchorPosition } from './types-private';

type Props = {
  startingPoint: Point;
  startingAnchorOrientation: AnchorPosition;
  endingPoint: Point;
  endingAnchorOrientation: AnchorPosition;
  strokeColor: string;
  arrowLength: number;
  strokeWidth: number;
  strokeDasharray?: string;
  arrowLabel?: ReactNode;
  arrowMarkerId: string;
  noCurves: boolean;
  offset?: number;
};

const computeArrowDirectionVector = (anchorOrientation: AnchorPosition) => {
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

export const computeEndingPointAccordingToArrowHead = (
  xArrowHeadEnd: number,
  yArrowHeadEnd: number,
  arrowLength: number,
  strokeWidth: number,
  endingAnchorOrientation: AnchorPosition
) => {
  const endingVector = computeArrowDirectionVector(endingAnchorOrientation);

  const { arrowX, arrowY } = endingVector;

  const xEnd = xArrowHeadEnd + (arrowX * arrowLength * strokeWidth) / 2;
  const yEnd = yArrowHeadEnd + (arrowY * arrowLength * strokeWidth) / 2;

  return { xEnd, yEnd };
};

export const computeStartingAnchorPosition = (
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
  startingAnchorOrientation: AnchorPosition
): { xAnchor1: number; yAnchor1: number } => {
  if (
    startingAnchorOrientation === 'top' ||
    startingAnchorOrientation === 'bottom'
  ) {
    return {
      xAnchor1: xStart,
      yAnchor1: yStart + (yEnd - yStart) / 2
    };
  }
  if (
    startingAnchorOrientation === 'left' ||
    startingAnchorOrientation === 'right'
  ) {
    return {
      xAnchor1: xStart + (xEnd - xStart) / 2,
      yAnchor1: yStart
    };
  }

  return { xAnchor1: xStart, yAnchor1: yStart };
};

export const computeEndingAnchorPosition = (
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
  endingAnchorOrientation: AnchorPosition
): { xAnchor2: number; yAnchor2: number } => {
  if (
    endingAnchorOrientation === 'top' ||
    endingAnchorOrientation === 'bottom'
  ) {
    return {
      xAnchor2: xEnd,
      yAnchor2: yEnd - (yEnd - yStart) / 2
    };
  }
  if (
    endingAnchorOrientation === 'left' ||
    endingAnchorOrientation === 'right'
  ) {
    return {
      xAnchor2: xEnd - (xEnd - xStart) / 2,
      yAnchor2: yEnd
    };
  }

  return { xAnchor2: xEnd, yAnchor2: yEnd };
};

export const computeLabelDimensions = (
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number
): {
  xLabel: number;
  yLabel: number;
  labelWidth: number;
  labelHeight: number;
} => {
  const labelWidth = Math.max(Math.abs(xEnd - xStart), 1);
  const labelHeight = Math.max(Math.abs(yEnd - yStart), 1);

  const xLabel = xEnd > xStart ? xStart : xEnd;
  const yLabel = yEnd > yStart ? yStart : yEnd;

  return {
    xLabel,
    yLabel,
    labelWidth,
    labelHeight
  };
};

export const computePathString = ({
  xStart,
  yStart,
  xAnchor1,
  yAnchor1,
  xAnchor2,
  yAnchor2,
  xEnd,
  yEnd,
  noCurves,
  offset
}: {
  xStart: number;
  yStart: number;
  xAnchor1: number;
  yAnchor1: number;
  xAnchor2: number;
  yAnchor2: number;
  xEnd: number;
  yEnd: number;
  noCurves: boolean;
  offset?: number;
}): string => {
  const curveMarker = noCurves ? '' : 'C';

  if (offset && offset > 0) {
    const angle = Math.atan2(yAnchor1 - yStart, xAnchor1 - xStart);

    const xOffset = offset * Math.cos(angle);
    const yOffset = offset * Math.sin(angle);

    xStart = xStart + xOffset;
    xEnd = xEnd - xOffset;

    yStart = yStart + yOffset;
    yEnd = yEnd - yOffset;
  }

  return (
    `M${xStart},${yStart} ` +
    `${curveMarker}${xAnchor1},${yAnchor1} ${xAnchor2},${yAnchor2} ` +
    `${xEnd},${yEnd}`
  );
};

const SvgArrow = ({
  startingPoint,
  startingAnchorOrientation,
  endingPoint,
  endingAnchorOrientation,
  strokeColor,
  arrowLength,
  strokeWidth,
  strokeDasharray,
  arrowLabel,
  arrowMarkerId,
  noCurves,
  offset
}: Props) => {
  const actualArrowLength = arrowLength * 2;

  const xStart = startingPoint.x;
  const yStart = startingPoint.y;

  const endingPointWithArrow = computeEndingPointAccordingToArrowHead(
    endingPoint.x,
    endingPoint.y,
    actualArrowLength,
    strokeWidth,
    endingAnchorOrientation
  );
  const { xEnd, yEnd } = endingPointWithArrow;

  const startingPosition = computeStartingAnchorPosition(
    xStart,
    yStart,
    xEnd,
    yEnd,
    startingAnchorOrientation
  );
  const { xAnchor1, yAnchor1 } = startingPosition;

  const endingPosition = computeEndingAnchorPosition(
    xStart,
    yStart,
    xEnd,
    yEnd,
    endingAnchorOrientation
  );
  const { xAnchor2, yAnchor2 } = endingPosition;

  const pathString = computePathString({
    xStart,
    yStart,
    xAnchor1,
    yAnchor1,
    xAnchor2,
    yAnchor2,
    xEnd,
    yEnd,
    noCurves,
    offset
  });

  const { xLabel, yLabel, labelWidth, labelHeight } = computeLabelDimensions(
    xStart,
    yStart,
    xEnd,
    yEnd
  );

  return (
    <g>
      <path
        d={pathString}
        style={{
          fill: 'none',
          stroke: strokeColor,
          strokeWidth,
          strokeDasharray
        }}
        markerEnd={`url(${location.href.split('#')[0]}#${arrowMarkerId})`}
      />
      {arrowLabel && (
        <foreignObject
          x={xLabel}
          y={yLabel}
          width={labelWidth}
          height={labelHeight}
          style={{ overflow: 'visible', pointerEvents: 'none' }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              pointerEvents: 'all'
            }}
          >
            <div>{arrowLabel}</div>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

export default SvgArrow;
