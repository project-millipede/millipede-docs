/* eslint-disable import/no-named-as-default */
import { HooksUtils } from '@app/render-utils';
import { useMergedRef } from '@huse/merged-ref';
import { grey } from '@mui/material/colors';
import { CSSProperties, FC, useEffect, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { features as appComponentFeatures } from '../features';
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
  strokeColor = grey[500],
  strokeWidth = 1,
  strokeDasharray,
  style,
  svgElementProps,
  className,
  children,
  elementStyle,
  handleResetCb
}) => {
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
        reset(archerTransitionComposedState);
      },
    []
  );

  useEffect(() => {
    return () => {
      /**
       * Reset internal transition composed state.
       *
       * Note:
       * The reset of archer elements and their respective transitions gets handled
       * in an archer-element effect (unmount - segment).
       *
       * Note:
       * Higher-level states associated with the component's lifecycle
       * can be reset by providing a callback function.
       */
      if (handleResetCb != undefined) {
        handleResetCb();
      }
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
