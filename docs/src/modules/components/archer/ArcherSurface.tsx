import React, { FC, ReactNode, RefObject, useRef } from 'react';
import useResizeObserver from 'use-resize-observer';

import { useRefState } from './context/RefProvider';
import { useTransitionState } from './context/TransitionProvider';
import { Point } from './Point';
import SvgArrow from './SvgArrow';
import { AnchorPosition, ArcherContainerProps, EntityRelationType, SourceToTargetType } from './types';

const rectToPoint = (rect: ClientRect) => {
  return new Point(rect.left, rect.top);
};

const computeCoordinatesFromAnchorPosition = (
  anchorPosition: AnchorPosition,
  rect: ClientRect
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

const getRectFromRef = (element: HTMLElement): ClientRect => {
  if (!element) return null;

  return element.getBoundingClientRect();
};

const getSourceToTargets = (sourceToTargetsMap: {
  [key: string]: Array<SourceToTargetType>;
}): Array<SourceToTargetType> => {
  // Object.values is unavailable in IE11
  const jaggedSourceToTargets: Array<Array<SourceToTargetType>> = Object.keys(
    sourceToTargetsMap
  ).map((key: string) => sourceToTargetsMap[key]);
  return [].concat(...jaggedSourceToTargets);
};

const defaultSvgContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none'
};

export const ArcherSurface: FC<ArcherContainerProps> = ({
  arrowLength,
  arrowThickness,
  strokeColor,
  strokeWidth,
  strokeDasharray,
  noCurves,
  style,
  svgContainerStyle,
  className,
  offset,
  children
}) => {
  const parentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useResizeObserver({ ref: parentRef });

  const refState = useRefState();
  const { sourceToTargetsMap } = useTransitionState();

  const arrowMarkerRandomNumber = Math.random().toString().slice(2);
  const arrowMarkerUniquePrefix = `arrow${arrowMarkerRandomNumber}`;

  const getPointCoordinatesFromAnchorPosition = (
    position: AnchorPosition,
    index: string,
    parentCoordinates: Point
  ): Point => {
    const rect = getRectFromRef(refState.refs[index].current);

    if (!rect) {
      return new Point(0, 0);
    }
    const absolutePosition = computeCoordinatesFromAnchorPosition(
      position,
      rect
    );

    return absolutePosition.substract(parentCoordinates);
  };

  const getParentCoordinates = (): Point => {
    const rectp = getRectFromRef(parentRef.current);

    if (!rectp) {
      return new Point(0, 0);
    }
    return rectToPoint(rectp);
  };

  const getMarkerId = (
    source: EntityRelationType,
    target: EntityRelationType
  ): string => {
    return `${arrowMarkerUniquePrefix}${source.id}${target.id}`;
  };

  const getSvgContainerStyle = () => ({
    ...defaultSvgContainerStyle,
    ...svgContainerStyle
  });

  const computeArrows = (): ReactNode => {
    const parentCoordinates = getParentCoordinates();

    return getSourceToTargets(sourceToTargetsMap).map(
      ({ source, target, label, style = {} }: SourceToTargetType) => {
        // Actual arrowLength value might be 0, which can't work with a simple 'actualValue || defaultValue'
        let arrowLengthDetermined = arrowLength;
        if (style.arrowLength || style.arrowLength === 0) {
          arrowLengthDetermined = style.arrowLength;
        }

        const startingAnchorOrientation = source.anchor;
        const startingPoint = getPointCoordinatesFromAnchorPosition(
          source.anchor,
          source.id,
          parentCoordinates
        );

        const endingAnchorOrientation = target.anchor;
        const endingPoint = getPointCoordinatesFromAnchorPosition(
          target.anchor,
          target.id,
          parentCoordinates
        );

        return (
          <SvgArrow
            key={JSON.stringify({ source, target })}
            startingPoint={startingPoint}
            startingAnchorOrientation={startingAnchorOrientation}
            endingPoint={endingPoint}
            endingAnchorOrientation={endingAnchorOrientation}
            strokeColor={style.strokeColor || strokeColor}
            arrowLength={arrowLengthDetermined}
            strokeWidth={style.strokeWidth || strokeWidth}
            strokeDasharray={style.strokeDasharray || strokeDasharray}
            arrowLabel={label}
            arrowMarkerId={getMarkerId(source, target)}
            noCurves={style.noCurves || noCurves}
            offset={offset || 0}
          />
        );
      }
    );
  };

  const generateAllArrowMarkers = (): ReactNode => {
    return getSourceToTargets(sourceToTargetsMap).map(
      ({ source, target, style = {} }: SourceToTargetType) => {
        // Actual arrowLength value might be 0, which can't work with a simple 'actualValue || defaultValue'
        let arrowLengthFinal = arrowLength;
        if (style.arrowLength || style.arrowLength === 0) {
          arrowLengthFinal = style.arrowLength;
        }

        const arrowThicknessFinal = style.arrowThickness || arrowThickness;

        const arrowPath = `M0,0 L0,${arrowThicknessFinal} L${arrowLength},${
          arrowThicknessFinal / 2
        } z`;

        return (
          <marker
            id={getMarkerId(source, target)}
            key={getMarkerId(source, target)}
            markerWidth={arrowLengthFinal}
            markerHeight={arrowThicknessFinal}
            refX='0'
            refY={arrowThicknessFinal / 2}
            orient='auto'
            markerUnits='strokeWidth'
          >
            <path d={arrowPath} fill={style.strokeColor || strokeColor} />
          </marker>
        );
      }
    );
  };

  const SvgArrows = computeArrows();

  return (
    <div style={{ ...style, position: 'relative' }} className={className}>
      <div style={{ height: '100%' }} ref={parentRef}>
        {children}
      </div>

      <svg style={getSvgContainerStyle() as any}>
        <defs>{generateAllArrowMarkers()}</defs>
        {SvgArrows}
      </svg>
    </div>
  );
};

ArcherSurface.defaultProps = {
  arrowLength: 10,
  arrowThickness: 6,
  strokeColor: '#f00',
  strokeWidth: 2,
  svgContainerStyle: {}
};
