import { EffectRef } from '@huse/effect-ref';
import _ from 'lodash';
import React, { FC, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import {
  refPostScrollState,
  scrollPostReducer,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/post/reducer';
import { useMeasure } from '../../../../../../demo/social/components/reactUseMeasureNextNext';
import { InteractionSliceProps } from './types';
import { withArcher } from './with-archer';
import { withForwardRef } from './with-forward-ref';

// import { useMergedRef } from '@huse/merged-ref';
const RenderFn = ({ children }) => children();

export const defaultSliceBackgrundColor = {
  header: {
    color: '#03a9f4'
  }, // lightBlue
  media: { color: '#8bc34a' }, // lightGreen'
  content: { color: '#4caf50' }, // green
  sentiment: { color: '#9e9e9e' }, // grey'
  comments: { color: '#ff5722' } // 'deepOrange'
};

const InteractionSliceObserver: FC<InteractionSliceProps> = ({
  timelineId,
  postId,
  sliceId,
  postBounds,
  forwardedRef,
  dynamicRef
}) => {
  return (
    <RenderFn key={`renderFn-${timelineId}-${postId}-${sliceId}`}>
      {() => {
        const ref = useRef<HTMLElement>();

        const [sliceRef, sliceBounds] = useMeasure({
          debounce: 0,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          callBack: _node => {
            ref.current = _node;
          }
        });

        // const combinedRef = useMergedRef([sliceRef, forwardedRef]);

        const setRefPostScroll = useSetRecoilState(refPostScrollState(postId));

        const updateItem = useCallback(
          (
            timelineId: string,
            sliceId: string,
            value: EffectRef<HTMLElement>
          ) => {
            setRefPostScroll(state =>
              scrollPostReducer.updateObservedSubSliceItem(
                state,
                timelineId,
                sliceId,
                value
              )
            );
          },
          [scrollPostReducer.updateObservedSubSliceItem, setRefPostScroll]
        );

        const removeItem = useCallback(
          (timelineId: string, sliceId: string) => {
            setRefPostScroll(state =>
              scrollPostReducer.removeObservedSubSliceItem(
                state,
                timelineId,
                sliceId
              )
            );
          },
          [scrollPostReducer.removeObservedSubSliceItem, setRefPostScroll]
        );

        useLayoutEffect(() => {
          updateItem(timelineId, sliceId, sliceRef);
          return () => {
            removeItem(timelineId, sliceId);
          };
        }, []);

        const [selected, setSelected] = useState(false);

        useImperativeHandle(
          dynamicRef,
          () => ({
            select: () => {
              // with List / ListItem / Card
              ref.current.parentElement.parentElement.scrollIntoView({
                block: 'center',
                inline: 'center',
                behavior: 'smooth'
              });
              // with Div / Card
              // if (ref.current && ref.current.parentElement) {
              //   ref.current.parentElement.scrollIntoView({
              //     block: 'center',
              //     inline: 'center',
              //     behavior: 'smooth'
              //   });
              // }
              setSelected(true);
            },
            unSelect: () => {
              setSelected(false);
            }
          }),
          [ref.current]
        );

        return (
          <div
            // ref={combinedRef}
            ref={forwardedRef}
            style={{
              top: sliceBounds.top - postBounds.top,
              height: sliceBounds.height,
              width: '100%',
              position: 'absolute',
              background: !selected
                ? _.get(defaultSliceBackgrundColor, sliceId).color
                : '#E0E0E0'
            }}
          />
        );
      }}
    </RenderFn>
  );
};

const InteractionSliceObserverWithForwardRef = withForwardRef<
  HTMLElement,
  InteractionSliceProps
>(InteractionSliceObserver);

export const InteractionSliceObserverWithArcher = withArcher(
  InteractionSliceObserverWithForwardRef
);
