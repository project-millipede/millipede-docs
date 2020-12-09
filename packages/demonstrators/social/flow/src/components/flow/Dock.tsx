import { HooksUtils } from '@app/render-utils';
import { scrollReducers, scrollStates } from '@demonstrators-social/shared';
import { EffectRef } from '@huse/effect-ref';
import React, { CSSProperties, FC, useCallback, useLayoutEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getSelectedPostIds } from './Dock.svc';
import { InteractionItem } from './DockItem';

export interface InteractionProps {
  timelineId: string;
  offSet: number;
  styles?: CSSProperties;
  position: string;
}

export const Interaction: FC<InteractionProps> = ({
  timelineId,
  offSet,
  styles,
  position
}) => {
  const {
    timeline: { nodesWithRelationsWithEdgeState, refContainerScrollState }
  } = scrollStates;

  const setRefContainerScroll = useSetRecoilState(
    refContainerScrollState(timelineId)
  );

  const nodeWithRelationsWithEdge = useRecoilValue(
    nodesWithRelationsWithEdgeState
  );

  // TODO: Memoize postIds currently selected
  const selectedPostIds = getSelectedPostIds(
    timelineId,
    nodeWithRelationsWithEdge,
    position
  );

  const updateObservedItem = useCallback(
    (value: EffectRef<HTMLElement>) => {
      setRefContainerScroll(state =>
        scrollReducers.timeline.updateObservedItem(state, value)
      );
    },
    [scrollReducers.timeline.updateObservedItem]
  );

  const removeObservedItem = useCallback(() => {
    setRefContainerScroll(state =>
      scrollReducers.timeline.removeObservedItem(state)
    );
  }, [scrollReducers.timeline.removeObservedItem]);

  const [containerRef, containerBounds] = HooksUtils.useMeasure({
    debounce: 0
  });

  useLayoutEffect(() => {
    updateObservedItem(containerRef);
    return () => {
      removeObservedItem();
    };
  }, []);

  return (
    <div
      key={`interaction-${timelineId}`}
      style={{
        ...styles
      }}
    >
      {selectedPostIds.map(postId => {
        return (
          <InteractionItem
            key={`interaction-${timelineId}-${postId}`}
            postId={postId}
            timelineId={timelineId}
            containerScroll={containerBounds}
            offSet={offSet}
          />
        );
      })}
    </div>
  );
};
