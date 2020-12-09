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

interface ScenarioControlProps {
  ltr: boolean;
  leftTimelineId: string;
  rightTimelineId: string;
}

const baseActions = ['head', 'tail'];

// N Posts, with N Slices
export const ScenarioControlNWithN: FC<ScenarioControlProps> = ({
  leftTimelineId,
  rightTimelineId,
  ltr
}) => {
  const { t } = useTranslation();

  const {
    state
  }: {
    state: RootState;
  } = useHoux();

  const {
    timeline: { timelineViewState, nodesWithRelationsWithEdgeState },
    post: { postIdsState }
  } = scrollStates;

  const {
    interaction: { interactionOptionsSelector }
  } = scrollSelectors;

  const usedSlices = useRecoilValue(interactionOptionsSelector);
  const timelineView = useRecoilValue(timelineViewState);

  const postIdsLeft = useRecoilValue(postIdsState(leftTimelineId));
  const postIdsRight = useRecoilValue(postIdsState(rightTimelineId));

  const setNodesWithRelationsWithEdge = useSetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  const activePostIds = selectors.timeline.selectInteractionDataForPostScenario(
    ltr ? leftTimelineId : rightTimelineId,
    ltr ? rightTimelineId : leftTimelineId,
    ltr ? postIdsLeft : postIdsRight,
    timelineView.currentViews,
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
