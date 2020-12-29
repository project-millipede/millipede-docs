import { Archer } from '@app/components';
import { useHoux } from '@app/houx';
import { generateData, Types } from '@demonstrators-social/data';
import { FlowControl, FlowControlObserver, FlowPlayControl, FlowSurface } from '@demonstrators-social/flow';
import { actions, RootState, selectors, TimelineActions } from '@demonstrators-social/shared';
import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react';

import { Post } from './components/post/Post';
import { Timeline } from './components/timeline/Timeline';

export const SocialApp: FC = () => {
  const {
    state,
    dispatch
  }: {
    state: RootState;
    dispatch: Dispatch<TimelineActions>;
  } = useHoux();

  const normalizePosts = useCallback(
    (usecaseData: Types.UseCase) => {
      dispatch(actions.timeline.normalizeData(usecaseData));
    },
    [dispatch, actions.timeline.normalizeData]
  );

  const loadPosts = useCallback(async () => {
    const data = await generateData();
    normalizePosts(data);
  }, [generateData]);

  useEffect(() => {
    if (state.timeline == null) {
      loadPosts();
    }
  }, []);

  const useCase = (state.timeline &&
    selectors.timeline.selectUserCaseState(state)) || {
    id: '',
    timelines: []
  };

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
        <Archer.ArcherContext.TransitionProvider>
          <Archer.ArcherContext.RefProvider>
            {leftTimeline && rightTimeline ? (
              <FlowControlObserver
                handleControlOffset={value => {
                  setOffSet(value);
                }}
                style={{
                  marginTop: '0'
                }}
              >
                <FlowPlayControl
                  leftTimelineId={leftTimeline.id}
                  rightTimelineId={rightTimeline.id}
                />
              </FlowControlObserver>
            ) : null}

            {leftTimeline && rightTimeline ? (
              <FlowSurface
                leftTimelineId={leftTimeline.id}
                rightTimelineId={rightTimeline.id}
                offSetControls={offSet}
              />
            ) : null}

            {leftTimeline && rightTimeline ? (
              <FlowControl
                leftTimelineId={leftTimeline.id}
                rightTimelineId={rightTimeline.id}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                handleControlOffset={_value => {}}
                style={{
                  marginTop: 'auto',
                  marginBottom: '0'
                }}
              />
            ) : null}
          </Archer.ArcherContext.RefProvider>
        </Archer.ArcherContext.TransitionProvider>
      </div>
      {rightTimelineComp && rightTimelineComp}
    </div>
  );
};
