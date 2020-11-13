import { EffectRef } from '@huse/effect-ref';
import React, { CSSProperties, FC, useCallback, useLayoutEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  nodesWithRelationsWithEdgeState,
  refContainerScrollState,
  scrollTimelineReducer,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/timeline/reducer';
import { useMeasure } from '../../../../../../demo/social/components/reactUseMeasureNextNext';
import { getSelectedPostIds } from './Interaction.svc';
import { InteractionItem } from './InteractionItem';

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
        scrollTimelineReducer.updateObservedItem(state, value)
      );
    },
    [scrollTimelineReducer.updateObservedItem]
  );

  const removeObservedItem = useCallback(() => {
    setRefContainerScroll(state =>
      scrollTimelineReducer.removeObservedItem(state)
    );
  }, [scrollTimelineReducer.removeObservedItem]);

  const [containerRef, containerBounds] = useMeasure({ debounce: 0 });

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
