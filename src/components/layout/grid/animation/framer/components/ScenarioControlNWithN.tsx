import { useHoux } from '@houx';
import { Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  interactionOptionsSelector,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/interaction/reducer';
import { postIdsState } from '../../../../../../../docs/src/modules/recoil/features/scroll/post/reducer';
import {
  addTopic,
  createNodesWithRelations,
  nodesWithRelationsWithEdgeState,
  NodeWithRelationsWithEdge,
  timelineViewState,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/timeline/reducer';
import {
  selectInteractionDataForPostScenario,
} from '../../../../../../../docs/src/modules/redux/features/timeline/selector';
import { RootState } from '../../../../../../../docs/src/modules/redux/reducers';
import { compareDescFn } from '../../../../../../../docs/src/modules/utils/collection/array';

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

  const usedSlices = useRecoilValue(interactionOptionsSelector);
  const timelineView = useRecoilValue(timelineViewState);

  const postIdsLeft = useRecoilValue(postIdsState(leftTimelineId));
  const postIdsRight = useRecoilValue(postIdsState(rightTimelineId));

  const setNodesWithRelationsWithEdge = useSetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  const activePostIds = selectInteractionDataForPostScenario(
    ltr ? leftTimelineId : rightTimelineId,
    ltr ? rightTimelineId : leftTimelineId,
    ltr ? postIdsLeft : postIdsRight,
    timelineView.currentViews,
    compareDescFn('content.createdAt')
  )(state);

  const handleCreate = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const result = activePostIds.reduce(
      (acc, activePostId) => {
        const nodeWithRelationsWithEdge = usedSlices.map(usedSlice => {
          const baseActionsExtended = addTopic(
            baseActions,
            `${activePostId}-${usedSlice}`,
            'pages/pidp/use-case/recognition/index:'
          );

          return createNodesWithRelations(baseActionsExtended, t, ltr)(
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
          values: Array<NodeWithRelationsWithEdge>;
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
