import { useHoux } from '@houx';
import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react';
import { AutoPlayFlowControl } from 'src/components/layout/grid/animation/framer/components/AutoPlayFlowControl';

import { RefProvider } from '../../../../docs/src/modules/components/archer/context/RefProvider';
import { TransitionProvider } from '../../../../docs/src/modules/components/archer/context/TransitionProvider';
import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { normalizeData } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { selectUserCaseState } from '../../../../docs/src/modules/redux/features/timeline/selector';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { InteractionFlow } from '../../../components/layout/grid/animation/framer/components/InteractionFlow';
import {
  InteractionFlowControl,
  InteractionFlowControlObserver,
} from '../../../components/layout/grid/animation/framer/components/InteractionFlowControl';
import { generateData } from '../../../data/social/mocks';
import { UseCase } from '../../../typings/social';
import { Post } from './Post';
import { Timeline } from './Timeline';

export const SocialApp: FC = () => {
  const {
    state,
    dispatch
  }: {
    state: RootState;
    dispatch: Dispatch<TimelineActions>;
  } = useHoux();

  const normalizePosts = useCallback(
    (usecaseData: UseCase) => {
      dispatch(normalizeData(usecaseData));
    },
    [dispatch, normalizeData]
  );

  const loadPosts = useCallback(async () => {
    const data = await generateData();
    normalizePosts(data);
  }, [generateData]);

  useEffect(() => {
    loadPosts();
  }, []);

  const useCase = selectUserCaseState(state) || { id: '', timelines: [] };

  const { timelines = [] } = useCase;
  const [leftTimeline, rightTimeline] = timelines;

  const timelineComponents = timelines
    ? timelines.map((timeline, index) => {
        return (
          <Timeline
            key={`timeline-${index}`}
            timelineId={timeline.id}
            otherTimelineId={
              timeline.id === leftTimeline.id
                ? rightTimeline.id
                : leftTimeline.id
            }
            Comp={Post}
          />
        );
      })
    : null;

  const [leftTimelineComp, rightTimelineComp] = timelineComponents;

  const [offSet, setOffSet] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      {leftTimelineComp && leftTimelineComp}
      <div
        style={{
          width: '40vw',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <RefProvider>
          <TransitionProvider>
            {leftTimeline && rightTimeline ? (
              <InteractionFlowControlObserver
                handleControlOffset={value => {
                  setOffSet(value);
                }}
                style={{
                  marginTop: '0'

                  // position: 'sticky',
                  // top: '64px',
                  // backgroundColor: 'white'
                }}
              >
                <AutoPlayFlowControl
                  leftTimelineId={leftTimeline.id}
                  rightTimelineId={rightTimeline.id}
                />
              </InteractionFlowControlObserver>
            ) : null}

            {leftTimeline && rightTimeline ? (
              <InteractionFlow
                leftTimelineId={leftTimeline.id}
                rightTimelineId={rightTimeline.id}
                offSetControls={offSet}
              />
            ) : null}

            {leftTimeline && rightTimeline ? (
              <InteractionFlowControl
                leftTimelineId={leftTimeline.id}
                rightTimelineId={rightTimeline.id}
                handleControlOffset={_value => {
                  // setOffSet(value);
                }}
                style={{
                  marginTop: 'auto',
                  marginBottom: '0'

                  // position: 'sticky',
                  // bottom: '0',
                  // backgroundColor: 'white'
                }}
              />
            ) : null}
          </TransitionProvider>
        </RefProvider>
      </div>
      {rightTimelineComp && rightTimelineComp}
    </div>
  );
};
