import { useHoux } from '@houx';
import React, { Dispatch, FC, useCallback, useEffect } from 'react';
import { InteractionFlow } from 'src/components/layout/grid/animation/framer/components/InteractionFlow';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { normalizeData } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { selectUserCaseState } from '../../../../docs/src/modules/redux/features/timeline/selector';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
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
        {leftTimeline && rightTimeline ? (
          <InteractionFlow
            leftTimelineId={leftTimeline.id}
            rightTimelineId={rightTimeline.id}
            offSetControls={0}
          />
        ) : null}
      </div>
      {rightTimelineComp && rightTimelineComp}
    </div>
  );
};
