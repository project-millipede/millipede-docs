import { Archer } from '@app/components';
import { useHoux } from '@app/houx';
import { HooksUtils } from '@app/render-utils';
import { StringUtil } from '@app/utils';
import { Player, StepProvider } from '@demonstrator/components';
import { generateData, Types } from '@demonstrators-social/data';
import { FlowControl, FlowControlObserver, FlowPlayControl, FlowSurface, getSteps } from '@demonstrators-social/flow';
import { actions, RootState, selectors, TimelineActions } from '@demonstrators-social/shared';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { Dispatch, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Post } from './components/post/Post';
import { Timeline } from './components/timeline/Timeline';
import { PlayerSheet } from './PlayerSheet';

export const SocialApp: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

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

  const [topic, setTopic] = useState('');
  const [containerMeasureRef, , size] = HooksUtils.useMeasure({
    debounce: 0
  });

  const [bottomMeasureRef, , bottomSize] = HooksUtils.useMeasure({
    debounce: 0
  });

  const handleBottomSheet = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toggle();
  };

  const playlist = useMemo(() => {
    if (state.timeline != null) {
      const steps = getSteps(state);
      return steps;
    }
    return [];
  }, [state.timeline]);

  const selectedPlaylistItemSteps = useMemo(() => {
    if (!StringUtil.isEmptyString(topic)) {
      const [steps] = playlist
        .filter(value => value.id === topic)
        .map(value => value.steps);
      return steps;
    }
    return [];
  }, [topic, playlist]);

  const expander = (
    <IconButton size={'small'} onClick={handleBottomSheet}>
      {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
    </IconButton>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '5px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: 'lightgray'
      }}
    >
      {leftTimelineComp && leftTimelineComp}
      <div
        ref={containerMeasureRef}
        style={{
          width: '40vw',
          display: 'flex',
          flexDirection: 'column'
          // height: '95vh'
        }}
      >
        <Archer.ArcherContext.TransitionProvider>
          <Archer.ArcherContext.RefProvider>
            <StepProvider>
              {leftTimeline && rightTimeline ? (
                <FlowControlObserver
                  handleControlOffset={value => {
                    setOffSet(value);
                  }}
                >
                  <FlowControl
                    leftTimelineId={leftTimeline.id}
                    rightTimelineId={rightTimeline.id}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    handleControlOffset={_value => {}}
                    style={{
                      marginTop: 'auto',
                      marginBottom: '0',
                      zIndex: 3
                    }}
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

              {leftTimeline &&
              rightTimeline &&
              size.height &&
              bottomSize.height > 0 ? (
                <PlayerSheet
                  leftTimelineId={leftTimeline.id}
                  rightTimelineId={rightTimeline.id}
                  steps={selectedPlaylistItemSteps}
                  playlist={playlist}
                  size={size}
                  bottomSize={bottomSize}
                  isOpen={isOpen}
                  topic={topic}
                  onTopicChange={setTopic}
                />
              ) : null}

              {leftTimeline && rightTimeline ? (
                <div
                  ref={bottomMeasureRef}
                  style={{
                    marginTop: 'auto',
                    marginBottom: 0,
                    zIndex: 5
                  }}
                >
                  <FlowPlayControl
                    steps={selectedPlaylistItemSteps}
                    topic={topic}
                  />
                  <Player.Components.Player
                    steps={selectedPlaylistItemSteps}
                    isPlayerOpen={isOpen}
                    expander={expander}
                  />
                </div>
              ) : null}
            </StepProvider>
          </Archer.ArcherContext.RefProvider>
        </Archer.ArcherContext.TransitionProvider>
      </div>
      {rightTimelineComp && rightTimelineComp}
    </div>
  );
};
