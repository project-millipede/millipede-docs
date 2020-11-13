import { EffectRef } from '@huse/effect-ref';
import { useMergedRef } from '@huse/merged-ref';
import { cloneElement, FC, ReactElement, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useMeasure } from '../../../../../src/demo/social/components/reactUseMeasureNextNext';
import { refContainerScrollFromArcherState } from '../../recoil/features/scroll/timeline/reducer';
import { RenderSingleFn } from './types';

interface ArcherSurfaceObserverProps {
  timelineIds: Array<string>;
  children?: ReactElement;
  render?: RenderSingleFn;
}
export const ArcherSurfaceObserver: FC<ArcherSurfaceObserverProps> = ({
  timelineIds,
  children,
  render
}) => {
  const [leftTimelineId, rightTimelineId] = timelineIds;

  const setRefContainerScrollLeftTimeline = useSetRecoilState(
    refContainerScrollFromArcherState(leftTimelineId)
  );

  const setRefContainerScrollRightTimeline = useSetRecoilState(
    refContainerScrollFromArcherState(rightTimelineId)
  );

  const [containerRef1] = useMeasure({ debounce: 0 });
  const [containerRef2] = useMeasure({ debounce: 0 });

  const updateRefContainerScrollLeftTimeline = useCallback(
    (value: EffectRef<HTMLElement>) => {
      setRefContainerScrollLeftTimeline(state => {
        return {
          ...state,
          refObserved: value
        };
      });
    },
    [setRefContainerScrollLeftTimeline]
  );

  const updateRefContainerScrollRightTimeline = useCallback(
    (value: EffectRef<HTMLElement>) => {
      setRefContainerScrollRightTimeline(state => {
        return {
          ...state,
          refObserved: value
        };
      });
    },
    [setRefContainerScrollRightTimeline]
  );

  useEffect(() => {
    updateRefContainerScrollLeftTimeline(containerRef1);
    updateRefContainerScrollRightTimeline(containerRef2);
  }, []);

  const combinedRefs = useMergedRef([containerRef1, containerRef2]);

  if (render != null) {
    return render({ ref: combinedRefs as any });
  }

  return cloneElement(children, {
    ref: combinedRefs
  });
};
