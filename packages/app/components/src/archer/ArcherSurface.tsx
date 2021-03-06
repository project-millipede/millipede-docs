import { HooksUtils } from '@app/render-utils';
import { useMergedRef } from '@huse/merged-ref';
import React, { CSSProperties, forwardRef, ForwardRefRenderFunction, SVGProps, useRef, useState } from 'react';

import { useRefState } from './context/RefProvider';
import { useTransitionState } from './context/TransitionProvider';
import { Point } from './Point';
import SvgArrow from './SvgArrow';
import { AnchorPosition, ArcherContainerProps, EntityRelationType, SourceToTargetType } from './types-private';

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

const rectToPoint = (rect: ClientRect) => {
  return new Point(rect.left, rect.top);
};

const getRectFromRef = (element: HTMLElement) => {
  if (!element) return null;
  return element.getBoundingClientRect();
};

const getSourceToTargets = (sourceToTargetsMap: {
  [key: string]: Array<SourceToTargetType>;
}): Array<SourceToTargetType> => {
  const jaggedSourceToTargets: Array<Array<SourceToTargetType>> = Object.values(
    sourceToTargetsMap
  ).filter(value => value != null);
  const flattened = [].concat(...jaggedSourceToTargets);
  return flattened;
};

const defaultSvgContainerStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none'
};

const getMarkerId = (
  source: EntityRelationType,
  target: EntityRelationType,
  arrowMarkerUniquePrefix: string
): string => {
  return `${arrowMarkerUniquePrefix}${source.id}${target.id}`;
};

export const ArcherSurface: ForwardRefRenderFunction<
  HTMLDivElement,
  ArcherContainerProps
> = (
  {
    arrowLength = 15,
    arrowThickness = 9,
    strokeColor = '#f00',
    strokeWidth = 1,
    strokeDasharray,
    noCurves,
    style,
    svgElementProps,
    className,
    offset,
    children,
    elementStyle
  },
  _ref
) => {
  const { refs } = useRefState();
  const { sourceToTargetsMap } = useTransitionState();

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentObserverRef] = HooksUtils.useResize();

  const combinedRef = useMergedRef([parentRef, parentObserverRef]);

  const [arrowMarkerUniquePrefix] = useState(
    () => `arrow${Math.random().toString().slice(2)}`
  );

  const getCoordinatesFromAnchorPosition = (
    position: AnchorPosition,
    id: string,
    parentCoordinates: Point
  ): Point => {
    if (refs != null && refs[id] != null && refs[id].ref.current != null) {
      const rect = getRectFromRef(refs[id].ref?.current);

      if (rect != null) {
        const absolutePosition = computeCoordinatesFromAnchorPosition(
          position,
          rect
        );

        return absolutePosition.substract(parentCoordinates);
      }
      return new Point(0, 0);
    }
    return new Point(0, 0);
  };

  const getParentCoordinates = (): Point => {
    const rectp = getRectFromRef(parentRef.current);

    if (rectp != null) {
      return rectToPoint(rectp as ClientRect);
    }
    return new Point(0, 0);
  };

  const getSvgContainerStyle = (): SVGProps<SVGSVGElement> => ({
    style: {
      ...defaultSvgContainerStyle
    },
    ...svgElementProps
  });

  const computeArrows = () => {
    const parentCoordinates = getParentCoordinates();
    return getSourceToTargets(sourceToTargetsMap).map(
      ({ source, target, label, style = {} }: SourceToTargetType) => {
        // Actual arrowLength value might be 0, which can't work with a simple 'actualValue || defaultValue'
        let arrowLengthDetermined = arrowLength;
        if (style.arrowLength || style.arrowLength === 0) {
          arrowLengthDetermined = style.arrowLength;
        }

        const startingAnchorOrientation = source.anchor;
        const startingPoint = getCoordinatesFromAnchorPosition(
          source.anchor,
          source.id,
          parentCoordinates
        );

        const endingAnchorOrientation = target.anchor;
        const endingPoint = getCoordinatesFromAnchorPosition(
          target.anchor,
          target.id,
          parentCoordinates
        );

        const arrowMarkerId = getMarkerId(
          source,
          target,
          arrowMarkerUniquePrefix
        );

        return (
          <SvgArrow
            key={arrowMarkerId}
            startingPoint={startingPoint}
            startingAnchorOrientation={startingAnchorOrientation}
            endingPoint={endingPoint}
            endingAnchorOrientation={endingAnchorOrientation}
            strokeColor={style.strokeColor || strokeColor}
            arrowLength={arrowLengthDetermined}
            strokeWidth={style.strokeWidth || strokeWidth}
            strokeDasharray={style.strokeDasharray || strokeDasharray}
            arrowLabel={label}
            arrowMarkerId={arrowMarkerId}
            noCurves={style.noCurves || noCurves}
            offset={offset || 0}
          />
        );
      }
    );
  };

  const generateAllArrowMarkers = () => {
    return getSourceToTargets(sourceToTargetsMap).map(
      ({ source, target, style = {} }: SourceToTargetType) => {
        // Actual arrowLength value might be 0, which can't work with a simple 'actualValue || defaultValue'
        let arrowLengthFinal = arrowLength;
        if (style.arrowLength || style.arrowLength === 0) {
          arrowLengthFinal = style.arrowLength;
        }

        const arrowThicknessFinal = style.arrowThickness || arrowThickness;

        const markerId = getMarkerId(source, target, arrowMarkerUniquePrefix);

        const arrowPath = `M0,0 L0,${arrowThicknessFinal} L${arrowLength},${
          arrowThicknessFinal / 2
        } z`;

        return (
          <marker
            id={markerId}
            key={markerId}
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

  return (
    <div
      style={{
        ...style,
        position: 'relative'
      }}
      className={className}
    >
      <div
        style={{
          ...elementStyle,
          height: '100%'
        }}
        ref={combinedRef}
      >
        {children}
      </div>

      <svg {...getSvgContainerStyle()}>
        <defs>{generateAllArrowMarkers()}</defs>
        {computeArrows()}
      </svg>
    </div>
  );
};

export default forwardRef(ArcherSurface);
