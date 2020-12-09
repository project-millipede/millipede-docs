import { ArcherTypes } from '@app/components';
import { HooksUtils } from '@app/render-utils';
import { scrollStates } from '@demonstrators-social/shared';
import { EffectRef } from '@huse/effect-ref';
import { useMergedRef } from '@huse/merged-ref';
import { cloneElement, FC, ReactElement, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

interface ArcherSurfaceObserverProps {
  timelineIds: Array<string>;
  children?: ReactElement;
  render?: ArcherTypes.RenderSingleFn;
}
export const ArcherSurfaceObserver: FC<ArcherSurfaceObserverProps> = ({
  timelineIds,
  children,
  render
}) => {
  const [leftTimelineId, rightTimelineId] = timelineIds;

  const {
    timeline: { refContainerScrollFromArcherState }
  } = scrollStates;

  const setContainerScrollRefLeftTimeline = useSetRecoilState(
    refContainerScrollFromArcherState(leftTimelineId)
  );

  const setContainerScrollRefRightTimeline = useSetRecoilState(
    refContainerScrollFromArcherState(rightTimelineId)
  );

  const [containerScrollRefLeftTimeline] = HooksUtils.useMeasure({
    debounce: 0
  });
  const [containerScrollRefRightTimeline] = HooksUtils.useMeasure({
    debounce: 0
  });

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
