import { ArcherTypes } from '@app/archer';
import { HooksUtils } from '@app/render-utils';
import { features } from '@demonstrators-social/shared';
import { EffectRef } from '@huse/effect-ref';
import get from 'lodash/get';
import { forwardRef, ForwardRefRenderFunction, MutableRefObject, useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { withArcher } from '../../hocs/with-archer';

export const sliceBackgroundColor = {
  header: {
    color: '#03a9f4'
  }, // lightBlue
  media: { color: '#8bc34a' }, // lightGreen'
  content: { color: '#4caf50' }, // green
  sentiment: { color: '#9e9e9e' }, // grey'
  comments: { color: '#ff5722' } // 'deepOrange'
};

export interface DockSliceProps {
  timelineId: string;
  postId: string;
  sliceId: string;
  postBounds: Partial<DOMRectReadOnly>;
  dynamicRef: MutableRefObject<ArcherTypes.SyncHandle>;
}

const DockSlice: ForwardRefRenderFunction<HTMLDivElement, DockSliceProps> = (
  { timelineId, postId, sliceId, postBounds, dynamicRef },
  ref
) => {
  const {
    scroll: {
      post: {
        states: { refPostScrollState },
        utils: { updateObservedSubSliceItem, removeObservedSubSliceItem }
      }
    }
  } = features;

  const [sliceRef, sliceBounds] = HooksUtils.useScroll({
    debounce: 0,
    withCapture: false
  });

  useEffect(() => {
    if (dynamicRef && dynamicRef.current && dynamicRef.current.sync) {
      dynamicRef.current.sync(sliceBounds.y);
    }
  }, [sliceBounds]);

  const updateRefPostScroll = useRecoilCallback(
    ({ set }) =>
      (timelineId: string, sliceId: string, value: EffectRef<HTMLElement>) => {
        set(refPostScrollState(postId), state =>
          updateObservedSubSliceItem(state, timelineId, sliceId, value)
        );
      },
    []
  );

  const removeRefPostScroll = useRecoilCallback(
    ({ set }) =>
      (timelineId: string, sliceId: string) => {
        set(refPostScrollState(postId), state =>
          removeObservedSubSliceItem(state, timelineId, sliceId)
        );
      },
    []
  );

  useEffect(() => {
    updateRefPostScroll(timelineId, sliceId, sliceRef);
    return () => {
      removeRefPostScroll(timelineId, sliceId);
    };
  }, [dynamicRef.current]);

  const translate = sliceBounds.top - postBounds.top;

  return (
    <div
      ref={ref}
      style={{
        // inline calc
        // transform: `translateY(calc(${sliceBounds.top}px - ${postBounds.top}px))`,
        transform: `translateY(${translate}px)`,
        height: sliceBounds.height,
        width: '100%',
        position: 'absolute',
        background: get(sliceBackgroundColor, sliceId).color
      }}
    />
  );
};

const DockSliceWithForwardRef = forwardRef(DockSlice);

export default withArcher(DockSliceWithForwardRef);
