import { HocsUtils, HooksUtils } from '@app/render-utils';
import { scrollReducers, scrollStates } from '@demonstrators-social/shared';
import { EffectRef } from '@huse/effect-ref';
import get from 'lodash/get';
import React, { FC, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { withArcher } from '../../hocs/with-archer';
import { DockSliceProps } from '../../types';

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

const DockSlice: FC<DockSliceProps> = ({
  timelineId,
  postId,
  sliceId,
  postBounds,
  forwardedRef,
  dynamicRef
}) => {
  const {
    post: { updateObservedSubSliceItem, removeObservedSubSliceItem }
  } = scrollReducers;

  return (
    <RenderFn key={`renderFn-${timelineId}-${postId}-${sliceId}`}>
      {() => {
        const ref = useRef<HTMLElement>();

        const [sliceRef, sliceBounds] = HooksUtils.useMeasure({
          debounce: 0,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          callBack: _node => {
            ref.current = _node;
          }
        });

        const {
          post: { refPostScrollState }
        } = scrollStates;

        const setRefPostScroll = useSetRecoilState(refPostScrollState(postId));

        const updateItem = useCallback(
          (
            timelineId: string,
            sliceId: string,
            value: EffectRef<HTMLElement>
          ) => {
            setRefPostScroll(state =>
              updateObservedSubSliceItem(state, timelineId, sliceId, value)
            );
          },
          [updateObservedSubSliceItem, setRefPostScroll]
        );

        const removeItem = useCallback(
          (timelineId: string, sliceId: string) => {
            setRefPostScroll(state =>
              removeObservedSubSliceItem(state, timelineId, sliceId)
            );
          },
          [removeObservedSubSliceItem, setRefPostScroll]
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
              if (ref.current) {
                const {
                  current: {
                    parentElement: { parentElement }
                  }
                } = ref;
                parentElement.scrollIntoView({
                  block: 'center',
                  inline: 'center',
                  behavior: 'smooth'
                });
              }
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
                ? get(defaultSliceBackgrundColor, sliceId).color
                : '#E0E0E0'
            }}
          />
        );
      }}
    </RenderFn>
  );
};

const DockSliceObserverWithForwardRef = HocsUtils.withForwardRef<
  HTMLElement,
  DockSliceProps
>(DockSlice);

export const DockSliceObserverWithArcher = withArcher(
  DockSliceObserverWithForwardRef
);
