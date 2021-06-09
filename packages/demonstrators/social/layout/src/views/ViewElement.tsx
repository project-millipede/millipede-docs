import { useHoux } from '@app/houx';
import { ViewElementProps } from '@demonstrator/navigation';
import { FlowSurface } from '@demonstrators-social/flow';
import { RootState, selectors } from '@demonstrators-social/shared';
import { motion } from 'framer-motion';
import React, { FC, memo, useState } from 'react';

export const ViewElement: FC<ViewElementProps> = ({ layoutId, layout }) => {
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

  const [leftTimeline, rightTimeline] = timelines;
  const [
    offSet
    // setOffSet
  ] = useState(0);

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
    >
      {/* {leftTimeline && rightTimeline ? (
        <FlowControlObserver
          handleControlOffset={value => {
            setOffSet(value);
          }}
        >
          <FlowControl
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            handleControlOffset={_value => {}}
            style={{
              marginTop: 'auto',
              marginBottom: '0',
              zIndex: 3
            }}
          />
        </FlowControlObserver>
      ) : null} */}
      {leftTimeline && rightTimeline ? (
        <FlowSurface
          offSetControls={offSet}
          leftTimelineId={leftTimeline.id}
          rightTimelineId={rightTimeline.id}
        />
      ) : null}
    </motion.div>
  );
};

export default memo(ViewElement);
