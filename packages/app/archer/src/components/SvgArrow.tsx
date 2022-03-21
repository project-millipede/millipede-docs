import { useMergedRef } from '@huse/merged-ref';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { features } from '../features';
import { EdgeText } from './EdgeText';
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

  const { centerX, centerY } = computeLabelDimensions(
    startPointWithArrow,
    endPointWithArrow
  );

  return (
    <>
      <path
        d={pathString}
        style={{
          fill: 'none',
          stroke: strokeColor,
          strokeWidth,
          strokeDasharray
        }}
        markerEnd={`url(#${arrowMarkerId})`}
      />
      {arrowLabel && (
        <EdgeText x={centerX} y={centerY}>
          {arrowLabel}
        </EdgeText>
      )}
    </>
  );
};

export default forwardRef(SvgArrow);
