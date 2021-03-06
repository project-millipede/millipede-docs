import { useHoux } from '@app/houx';
import { ViewElementProps } from '@demonstrator/navigation';
import { RootState, selectors, viewportSelectors } from '@demonstrators-social/shared';
import { State } from '@demonstrators-social/shared/src/recoil/features/viewport/post/reducer';
import { motion } from 'framer-motion';
import React, { FC, memo, useRef } from 'react';
import { useRecoilCallback } from 'recoil';

import { Post } from '../components/post';
import { Timeline } from '../components/timeline';

export const LeftViewElement: FC<ViewElementProps> = ({ layoutId, layout }) => {
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

  const [timeline, otherTimeline] = timelines;

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

export default memo(LeftViewElement);
