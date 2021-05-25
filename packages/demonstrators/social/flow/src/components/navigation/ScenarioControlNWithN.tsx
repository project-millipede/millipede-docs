import { useHoux } from '@app/houx';
import { CollectionUtil } from '@app/utils';
import {
  RootState,
  scrollActions,
  scrollSelectors,
  scrollStates,
  ScrollTypes,
  selectors,
} from '@demonstrators-social/shared';
import { Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface ScenarioControlNWithN {
  ltr: boolean;
}

const baseActions = ['head', 'tail'];

// N Posts, with N Slices
export const ScenarioControlNWithN: FC<ScenarioControlNWithN> = ({ ltr }) => {
  const { t } = useTranslation();

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

  const { id: leftTimelineId } = leftTimeline || { id: '' };
  const { id: rightTimelineId } = rightTimeline || { id: '' };

  const {
    timeline: { timelineViewState, nodesWithRelationsWithEdgeState }
  } = scrollStates;

  const {
    post: { postIdsSelector }
  } = scrollSelectors;

  const {
    interaction: { interactionOptionsSelector }
  } = scrollSelectors;

  const usedSlices = useRecoilValue(interactionOptionsSelector);

  const postIdsLeft = useRecoilValue(postIdsSelector(leftTimelineId));
  const postIdsRight = useRecoilValue(postIdsSelector(rightTimelineId));

  const timelineViewLeft = useRecoilValue(timelineViewState(leftTimelineId));
  const timelineViewRight = useRecoilValue(timelineViewState(rightTimelineId));

  const setNodesWithRelationsWithEdge = useSetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  const activePostIds = selectors.timeline.selectInteractionDataForPostScenario(
    ltr ? leftTimelineId : rightTimelineId,
    ltr ? rightTimelineId : leftTimelineId,
    ltr ? postIdsLeft : postIdsRight,
    timelineViewLeft.activeTab,
    timelineViewRight.activeTab,
    CollectionUtil.Array.compareDescFn('content.createdAt')
  )(state);

  const handleCreate = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const result = activePostIds.reduce(
      (acc, activePostId) => {
        const nodeWithRelationsWithEdge = usedSlices.map(usedSlice => {
          const baseActionsExtended = scrollActions.timeline.addTopic(
            baseActions,
            `${activePostId}-${usedSlice}`,
            'pages/pidp/use-case/recognition/index:'
          );

          return scrollActions.timeline.createNodesWithRelations(
            baseActionsExtended,
            t,
            ltr
          )(
            [
              ltr ? leftTimelineId : rightTimelineId,
              ltr ? rightTimelineId : leftTimelineId
            ],
            activePostId,
            usedSlice
          );
        });

        return {
          ...acc,
          [activePostId]: {
            values: nodeWithRelationsWithEdge,
            id: `Post Id ${activePostId}`,
            description: `Post Description ${activePostId}`
          }
        };
      },
      {} as {
        [key: string]: {
          values: Array<ScrollTypes.Timeline.NodeWithRelationsWithEdge>;
          id: string;
          description: string;
        };
      }
    );

    const [fristActivePostId] = activePostIds;

    setNodesWithRelationsWithEdge(state => {
      return {
        ...state,
        nodesWithRelations: {
          ...state.nodesWithRelations,
          ...result
        },
        activeId: fristActivePostId
      };
    });
  };

  return <Button onClick={handleCreate}>E2E - N Posts, with N Slices</Button>;
};
