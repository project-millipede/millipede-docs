import { HooksUtils } from '@app/render-utils';
import { scrollReducers, scrollSelectors, scrollStates } from '@demonstrators-social/shared';
import { EffectRef } from '@huse/effect-ref';
import React, { FC, memo, useCallback, useLayoutEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { DockItemPropsRoot } from '../../types';
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

  const [postRef, postBounds] = HooksUtils.useScroll({
    debounce: 0,
    withCapture: false
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
    timeline: { sliceIdsSelector }
  } = scrollSelectors;

  const selectedSliceIds = useRecoilValue(sliceIdsSelector(timelineId));

  const sliceRectangles = selectedSliceIds.map(slice => {
    const {
      // postId: selectedPostId,
      sliceId,
      nodeWithRelations: {
        relations,
        node: { id: nodeId }
      }
    } = slice || { nodeWithRelations: { node: {} } };

    // TODO: Validate
    // return selectedPostId === postId ? (
    return (
      <DockSliceObserverWithArcher
        timelineId={timelineId}
        postId={postId}
        sliceId={sliceId}
        postBounds={postBounds}
        key={`dock-item-${timelineId}-${postId}-${sliceId}`}
        id={nodeId}
        relations={relations}
        isInteractive
      />
    );
    // : null;
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

export default memo(DockItem);
