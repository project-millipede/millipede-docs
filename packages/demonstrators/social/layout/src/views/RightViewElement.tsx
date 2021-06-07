import { useHoux } from '@app/houx';
import { ViewElementProps } from '@demonstrator/navigation';
import { RootState, selectors, viewportSelectors } from '@demonstrators-social/shared';
import { State } from '@demonstrators-social/shared/src/recoil/features/viewport/post/reducer';
import { motion } from 'framer-motion';
import React, { FC, memo, useEffect, useRef } from 'react';
import { useRecoilCallback } from 'recoil';

import { Post } from '../components/post';
import { Timeline } from '../components/timeline';

export const RightViewElement: FC<ViewElementProps> = ({
  layoutId,
  layout
}) => {
  const {
    state
  }: {
    state: RootState;
  } = useHoux();

  const useCase = (state.timeline &&
    selectors.timeline.selectUserCaseState(state)) || {
    id: '',
    timelines: []
  };

  const { timelines = [] } = useCase;

  const [otherTimeline, timeline] = timelines;

  const containerRef = useRef<HTMLDivElement>(null);

  const timelineComponent = timeline && (
    <Timeline
      key={`timeline-motion-${timeline.id}`}
      timelineId={timeline.id}
      otherTimelineId={otherTimeline.id}
      ref={containerRef}
      Comp={Post as any}
    />
  );

  console.log('- Right viewElement rendering');

  useEffect(() => {
    console.log('-- Right viewElement mounted');
    return () => {
      console.log('--- Right viewElement unmounted');
    };
  }, []);

  const {
    post: { viewportItemSelector }
  } = viewportSelectors;

  const getViewportItem = useRecoilCallback(
    ({ snapshot }) =>
      (timelineId: string) => {
        const viewportItemValue = snapshot
          .getLoadable<State>(viewportItemSelector(timelineId))
          .getValue();
        return viewportItemValue;
      }
  );

  return (
    <motion.div
      key={layoutId}
      layout={layout}
      layoutId={layoutId}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      onBeforeLayoutMeasure={() => {
        if (timeline) {
          const { offsetTop } = getViewportItem(timeline.id);
          containerRef.current.scroll(0, offsetTop);
        }
      }}
    >
      {timelineComponent}
    </motion.div>
  );
};

export default memo(RightViewElement);
