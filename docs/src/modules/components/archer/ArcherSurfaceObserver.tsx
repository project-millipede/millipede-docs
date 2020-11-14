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

  const setContainerScrollRefLeftTimeline = useSetRecoilState(
    refContainerScrollFromArcherState(leftTimelineId)
  );

  const setContainerScrollRefRightTimeline = useSetRecoilState(
    refContainerScrollFromArcherState(rightTimelineId)
  );

  const [containerScrollRefLeftTimeline] = useMeasure({ debounce: 0 });
  const [containerScrollRefRightTimeline] = useMeasure({ debounce: 0 });

  const updateContainerScrollRefLeftTimeline = useCallback(
    (value: EffectRef<HTMLElement>) => {
      setContainerScrollRefLeftTimeline(state => {
        return {
          ...state,
          refObserved: value
        };
      });
    },
    [setContainerScrollRefLeftTimeline]
  );

  const updateContainerScrollRefRightTimeline = useCallback(
    (value: EffectRef<HTMLElement>) => {
      setContainerScrollRefRightTimeline(state => {
        return {
          ...state,
          refObserved: value
        };
      });
    },
    [setContainerScrollRefRightTimeline]
  );

  useEffect(() => {
    updateContainerScrollRefLeftTimeline(containerScrollRefLeftTimeline);
    updateContainerScrollRefRightTimeline(containerScrollRefRightTimeline);
  }, []);

  const combinedRefs = useMergedRef([
    containerScrollRefLeftTimeline,
    containerScrollRefRightTimeline
  ]);

  if (render != null) {
    return render({ ref: combinedRefs });
  }

  return cloneElement(children, {
    ref: combinedRefs
  });
};
