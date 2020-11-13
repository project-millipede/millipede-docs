import { EffectRef } from '@huse/effect-ref';
import React, { FC, useCallback, useLayoutEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  refPostScrollState,
  scrollPostReducer,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/post/reducer';
import {
  nodesWithRelationsWithEdgeState,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/timeline/reducer';
import { useMeasure } from '../../../../../../demo/social/components/reactUseMeasureNextNext';
import { getSelectedSliceIds } from './Interaction.svc';
import { InteractionSliceObserverWithArcher } from './InteractionSliceObserver';
import { InteractionItemPropsRoot } from './types';

export const InteractionItem: FC<InteractionItemPropsRoot> = ({
  containerScroll,
  timelineId,
  postId,
  offSet
}) => {
  const setRefPostScroll = useSetRecoilState(refPostScrollState(postId));

  const [postRef, postBounds] = useMeasure({
    debounce: 0,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callBack: _node => {}
  });

  const updateObservedItem = useCallback(
    (timelineId: string, value: EffectRef<HTMLElement>) => {
      setRefPostScroll(state =>
        scrollPostReducer.updateObservedItem(state, timelineId, value)
      );
    },
    [scrollPostReducer.updateObservedItem]
  );

  const removeObservedItem = useCallback(
    (timelineId: string) => {
      setRefPostScroll(state =>
        scrollPostReducer.removeObservedItem(state, timelineId)
      );
    },
    [scrollPostReducer.removeObservedItem]
  );

  // 1.1 (mount, and update, deps)
  useLayoutEffect(() => {
    updateObservedItem(timelineId, postRef);
  }, [timelineId, postRef]);

  // 1.2 (unmount)
  useLayoutEffect(() => {
    return () => {
      removeObservedItem(timelineId);
    };
  }, []);

  const nodeWithRelationsWithEdge = useRecoilValue(
    nodesWithRelationsWithEdgeState
  );

  // TODO: Memoize sliceIds currently selected
  const selectedSliceIds = getSelectedSliceIds(
    timelineId,
    nodeWithRelationsWithEdge
  );

  const sliceRectangles = selectedSliceIds.map(slice => {
    const {
      postId: selectedPostId,
      sliceId,
      nodeWithRelations: {
        relations,
        node: { id: nodeId }
      }
    } = slice || { nodeWithRelations: { node: {} } };

    return selectedPostId && selectedPostId === postId ? (
      <InteractionSliceObserverWithArcher
        timelineId={timelineId}
        postId={postId}
        sliceId={sliceId}
        postBounds={postBounds}
        key={`interaction-item-${timelineId}-${postId}-${sliceId}`}
        id={nodeId}
        relations={relations}
      />
    ) : null;
  });

  return (
    <div
      style={{
        top: postBounds.top - containerScroll.top - offSet,
        height: postBounds.height,
        position: 'absolute',
        width: '25px',
        borderWidth: 'thin',
        borderStyle: 'solid',
        display: 'flex',
        visibility:
          postBounds.top - containerScroll.top !== 0 ? 'visible' : 'hidden'
      }}
    >
      {sliceRectangles}
    </div>
  );
};

// const InteractionItemWithForwardRef = withForwardRef<
//   HTMLElement,
//   InteractionItemProps
// >(InteractionItem);

// export const InteractionItemWithArcher = withArcher(
//   InteractionItemWithForwardRef
// );
