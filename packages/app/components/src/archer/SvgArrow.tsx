import { useMergedRef } from '@huse/merged-ref';
import React, { forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { features } from '../features';
import {
  computeArrowPointAccordingToArrowHead,
  computeEndAnchorPosition,
  computeLabelDimensions,
  computePath,
  computeStartAnchorPosition,
  getCoordinatesFromAnchorPosition,
  getParentCoordinates,
} from './SvgArrow.svc';
import { EntityRelationType } from './types-private';

type SvgArrowProps = {
  source: EntityRelationType;
  target: EntityRelationType;
  strokeColor: string;
  strokeWidth: number;
  strokeDasharray?: string;
  arrowMarkerId: string;
  arrowLabel: ReactNode;
  arrowLength: number;
};

export const SvgArrow: ForwardRefRenderFunction<
  HTMLDivElement,
  SvgArrowProps
> = (
  {
    source,
    target,
    strokeColor,
    strokeWidth,
    strokeDasharray,
    arrowMarkerId,
    arrowLabel,
    arrowLength
  },
  ref
) => {
  const {
    archer: {
      selector: { archerRefSelector }
    }
  } = features;

  const sourceRef = useRecoilValue(archerRefSelector(source.id));
  const targetRef = useRecoilValue(archerRefSelector(target.id));

  const combinedRef = useMergedRef([
    sourceRef.dynamicRef,
    targetRef.dynamicRef
  ]);

  const [renderCount, setRenderCount] = useState(0);

  /**
   * Synchronization of a dock component with an assigned bearing.
   *
   * Dock elements are used when playing a scenario to highlight
   * the relevant aspects of a post.
   *
   * The position of a Dock element corresponds to the scroll
   * position of the relevant post within the news feed.
   *
   * If a docking element is linked to another node, an arrow represents this.
   * Instead of performing a repeated scroll handler registration of an arrow
   * associated with a dock component with the relevant post section,
   * a signal is sent from the dock component to recalculate the arrow coordinates.
   */

  useImperativeHandle(
    combinedRef,
    () => ({
      sync: _y => {
        // force re-render
        setRenderCount(renderCount + 1);
      }
    }),
    [combinedRef, setRenderCount, renderCount]
  );

  const parentCoordinates = getParentCoordinates(ref);

  const startPoint = getCoordinatesFromAnchorPosition(
    source.anchor,
    parentCoordinates,
    sourceRef && sourceRef.ref
  );

  const endPoint = getCoordinatesFromAnchorPosition(
    target.anchor,
    parentCoordinates,
    targetRef && targetRef.ref
  );

  const startPointWithArrow = computeArrowPointAccordingToArrowHead(
    startPoint,
    arrowLength,
    strokeWidth,
    source.anchor
  );

  const endPointWithArrow = computeArrowPointAccordingToArrowHead(
    endPoint,
    arrowLength,
    strokeWidth,
    target.anchor
  );

  const computedStartPosition = computeStartAnchorPosition(
    startPointWithArrow,
    endPointWithArrow,
    source.anchor
  );

  const computedEndPosition = computeEndAnchorPosition(
    startPointWithArrow,
    endPointWithArrow,
    target.anchor
  );

  const pathString = computePath(
    startPoint, // startPointWithArrow,
    endPointWithArrow,
    computedStartPosition,
    computedEndPosition
  );

  const { position: labelPosition, size: labelSize } = computeLabelDimensions(
    startPoint,
    endPointWithArrow
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
          x={labelPosition.x}
          y={labelPosition.y}
          width={labelSize.width}
          height={labelSize.heigth}
          style={{ overflow: 'visible', pointerEvents: 'none' }}
        >
          <div
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              pointerEvents: 'all'
            }}
          >
            {arrowLabel}
          </div>
        </foreignObject>
      )}
    </g>
  );
};

export default forwardRef(SvgArrow);
