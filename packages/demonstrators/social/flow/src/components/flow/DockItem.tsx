import { HooksUtils } from '@app/render-utils';
import { scrollReducers, scrollStates } from '@demonstrators-social/shared';
import { EffectRef } from '@huse/effect-ref';
import React, { FC, useCallback, useLayoutEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { DockItemPropsRoot } from '../../types';
import { getSelectedSliceIds } from './Dock.svc';
import { DockSliceObserverWithArcher } from './DockSlice';

export const DockItem: FC<DockItemPropsRoot> = ({
  containerScroll,
  timelineId,
  postId,
  offSet
}) => {
  const {
    post: { refPostScrollState }
  } = scrollStates;

  const setRefPostScroll = useSetRecoilState(refPostScrollState(postId));

  const [postRef, postBounds] = HooksUtils.useMeasure({
    debounce: 0,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callBack: _node => {}
  });

  const updateObservedItem = useCallback(
    (timelineId: string, value: EffectRef<HTMLElement>) => {
      setRefPostScroll(state =>
        scrollReducers.post.updateObservedItem(state, timelineId, value)
      );
    },
    [scrollReducers.post.updateObservedItem]
  );

  const removeObservedItem = useCallback(
    (timelineId: string) => {
      setRefPostScroll(state =>
        scrollReducers.post.removeObservedItem(state, timelineId)
      );
    },
    [scrollReducers.post.removeObservedItem]
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

  const {
    timeline: { nodesWithRelationsWithEdgeState }
  } = scrollStates;

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
      <DockSliceObserverWithArcher
        timelineId={timelineId}
        postId={postId}
        sliceId={sliceId}
        postBounds={postBounds}
        key={`dock-item-${timelineId}-${postId}-${sliceId}`}
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

// const DockItemWithForwardRef = withForwardRef<
//   HTMLElement,
//   DockItemProps
// >(DockItem);

// export const DockItemWithArcher = withArcher(
//   DockItemWithForwardRef
// );
