import { HooksUtils } from '@app/render-utils';
import { features } from '@demonstrators-social/shared';
import { EffectRef } from '@huse/effect-ref';
import { FC, memo, useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import DockSliceWithArcher from './DockSlice';

export interface DockItemProps {
  timelineId: string;
  postId: string;
  containerScroll?: Partial<DOMRectReadOnly>;
}

export const DockItem: FC<DockItemProps> = ({
  timelineId,
  postId,
  containerScroll
}) => {
  const {
    scroll: {
      timeline: {
        selector: { dockedSliceIdsSelector }
      },
      post: {
        states: { refPostScrollState },
        utils: { updateObservedItem, removeObservedItem }
      }
    }
  } = features;

  const [postRef, postBounds] = HooksUtils.useScroll({
    debounce: 0,
    withCapture: false
  });

  const updateRefPostScroll = useRecoilCallback(
    ({ set }) =>
      (timelineId: string, handler: EffectRef<HTMLElement>) => {
        set(refPostScrollState(postId), state =>
          updateObservedItem(state, timelineId, handler)
        );
      },
    []
  );

  const removeRefPostScroll = useRecoilCallback(
    ({ set }) =>
      (timelineId: string) => {
        set(refPostScrollState(postId), state =>
          removeObservedItem(state, timelineId)
        );
      },
    []
  );

  useEffect(() => {
    updateRefPostScroll(timelineId, postRef);
    return () => {
      removeRefPostScroll(timelineId);
    };
  }, [timelineId, postRef]);

  const dockedSliceIds = useRecoilValue(
    dockedSliceIdsSelector({ timelineId, postId })
  );

  const sliceRectangles = dockedSliceIds.map(slice => {
    const {
      sliceId,
      nodeWithRelations: {
        relations,
        node: { id: nodeId }
      }
    } = slice;

    return (
      <DockSliceWithArcher
        key={`dock-${timelineId}-${postId}-${sliceId}`}
        timelineId={timelineId}
        postId={postId}
        sliceId={sliceId}
        postBounds={postBounds}
        id={nodeId}
        relations={relations}
        isInteractive
      />
    );
  });

  // const translate = postBounds.top - containerScroll.top;

  /**
   * To center grid-items use
   * - left: '50%' and
   * - transform: 'translateX(-50%)'
   */

  return (
    <div
      style={{
        left: '50%',
        // inline calc
        transform: `translateY(calc(${postBounds.top}px - ${containerScroll.top}px)) translateX(-50%)`,
        // transform: `translateY(${translate}px) translateX(-50%)`,
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
