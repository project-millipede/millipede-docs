/* eslint-disable import/no-named-as-default */
import { HooksUtils } from '@app/render-utils';
import { features } from '@demonstrators-social/shared';
import { useMergedRef } from '@huse/merged-ref';
import React, { CSSProperties, FC, useEffect, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { features as appComponentFeatures } from '..';
import SvgArrow from './SvgArrow';
import { ArcherSurfaceProps, SourceToTargetType } from './types-private';

const defaultSvgContainerStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none'
};

export const ArcherSurface: FC<ArcherSurfaceProps> = ({
  arrowLength = 16,
  arrowThickness = 8,
  strokeColor = '#8a4444',
  strokeWidth = 1,
  strokeDasharray,
  style,
  svgElementProps,
  className,
  children,
  elementStyle
}) => {
  const {
    scroll: {
      timeline: {
        states: { nodesWithRelationsWithEdgeState }
      }
    }
  } = features;

  const {
    archer: {
      states: { archerTransitionComposedState },
      selector: { archerTransitionComposedSelector }
    }
  } = appComponentFeatures;

  const parentRef = useRef<HTMLDivElement>(null);

  const [parentObserverRef] = HooksUtils.useResizeDebounce({
    debounce: 0,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callBack: _element => {}
  });

  const combinedRef = useMergedRef([parentRef, parentObserverRef]);

  const arrowMarkerUniquePrefix = HooksUtils.useConst(
    `arrow-${Math.random().toString().slice(2)}`
  );

  const { flattenedTransitions } = useRecoilValue(
    archerTransitionComposedSelector
  );

  const handleReset = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(nodesWithRelationsWithEdgeState);
        reset(archerTransitionComposedState);
      },
    []
  );

  useEffect(() => {
    return () => {
      /**
       * Reset implicitly created state nodes-with-relations-with-edge.
       * Reset subsequent state transition composed state archer-transition-composed,
       * Note:
       * The reset of archer elements and their respective transitions gets handled
       * in an archer-element effect (unmount - segment).
       */

      handleReset();
    };
  }, []);

  const renderArrow = ({
    source,
    target,
    label,
    style = {}
  }: SourceToTargetType) => {
    return (
      <SvgArrow
        key={`arrow-${source.id}-${target.id}`}
        strokeColor={style.strokeColor || strokeColor}
        strokeWidth={style.strokeWidth || strokeWidth}
        strokeDasharray={style.strokeDasharray || strokeDasharray}
        arrowLabel={label}
        arrowMarkerId={`${arrowMarkerUniquePrefix}-${source.id}-${target.id}`}
        arrowLength={arrowLength}
        source={source}
        target={target}
        ref={parentRef}
      />
    );
  };

  const renderArrowMarker = ({
    source,
    target,
    style = {}
  }: SourceToTargetType) => {
    const arrowPath = `M0,0 L0,${arrowThickness} L${arrowLength / 2},${
      arrowThickness / 2
    } z`;

    return (
      <marker
        id={`${arrowMarkerUniquePrefix}-${source.id}-${target.id}`}
        key={`${arrowMarkerUniquePrefix}-${source.id}-${target.id}`}
        markerWidth={arrowLength}
        markerHeight={arrowThickness}
        refX={0}
        refY={arrowThickness / 2}
        orient='auto'
        markerUnits='strokeWidth'
      >
        <path d={arrowPath} fill={style.strokeColor || strokeColor} />
      </marker>
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
      <svg style={defaultSvgContainerStyle} {...svgElementProps}>
        <defs>{flattenedTransitions.map(renderArrowMarker)}</defs>
        {flattenedTransitions.map(renderArrow)}
      </svg>
    </div>
  );
};
