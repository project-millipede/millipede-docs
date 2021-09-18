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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, ButtonGroup } from '@mui/material';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

export const publishActions = ['head', 'upload', 'download', 'tail'];

interface ProgressiveStepBuilderProps {
  ltr: boolean;
}

export const ProgressiveStepBuilder: FC<ProgressiveStepBuilderProps> = ({
  ltr
}) => {
  const { t } = useTranslation();

  const {
    timeline: { nodesWithRelationsWithEdgeState, timelineViewState }
  } = scrollStates;

  const {
    post: { postIdsSelector }
  } = scrollSelectors;

  const [nodesWithRelationsWithEdge, setNodesWithRelationsWithEdge] =
    useRecoilState(nodesWithRelationsWithEdgeState);

  const resetNodesWithRelationsWithEdgeState = useResetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  const { nodesWithRelations, activeId } = nodesWithRelationsWithEdge;

  const counter = useMemo(() => {
    const nodeWithRelationsWithEdge = get(nodesWithRelations, activeId, {
      values: [] as Array<ScrollTypes.Timeline.NodeWithRelationsWithEdge>
    });

    const { values } = nodeWithRelationsWithEdge;

    // Todo: fix access to first element, handle multiple elements
    const result =
      (values && values.length > 0 && values[0].nodeWithRelations.length) || 0;

    return result;
  }, [nodesWithRelations, activeId]);

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

  const postIdsLeft = useRecoilValue(postIdsSelector(leftTimelineId));
  const postIdsRight = useRecoilValue(postIdsSelector(rightTimelineId));

  const timelineViewLeft = useRecoilValue(timelineViewState(leftTimelineId));
  const timelineViewRight = useRecoilValue(timelineViewState(rightTimelineId));

  const [activePostId] =
    selectors.timeline.selectInteractionDataForPostScenario(
      ltr ? leftTimelineId : rightTimelineId,
      ltr ? rightTimelineId : leftTimelineId,
      ltr ? postIdsRight : postIdsLeft,
      timelineViewLeft.activeTab,
      timelineViewRight.activeTab,
      CollectionUtil.Array.compareDescFn('content.createdAt')
    )(state);

  const handleCreate = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (counter <= publishActions.length) {
      const progressiveActions = publishActions.slice(0, counter + 1);

      const result = [activePostId].reduce(
        (acc, activePostId) => {
          const nodeWithRelationsWithEdge = ['media'].map(usedSlice => {
            const baseActionsExtended = scrollActions.timeline.addTopic(
              progressiveActions,
              'publish',
              'pages/pidp/use-case/recognition/index:'
            );

            return scrollActions.timeline.createNodesWithRelations(
              baseActionsExtended,
              t,
              ltr,
              ScrollTypes.Timeline.LAYOUT.PROGRESSIVE
            )(
              ltr
                ? [leftTimeline.id, rightTimeline.id]
                : [rightTimeline.id, leftTimeline.id],
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

      setNodesWithRelationsWithEdge(state => {
        return {
          ...state,
          nodesWithRelations: {
            ...state.nodesWithRelations,
            ...result
          },
          activeId: activePostId,
          finalSize: publishActions.length
        };
      });
    }
  };

  const handleReset = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    resetNodesWithRelationsWithEdgeState();
  };

  return (
    <ButtonGroup variant='text' color='primary' size='large' fullWidth>
      <Button
        id={`progressiveStepBuilder-reset`}
        onClick={handleReset}
        variant='text'
        color='primary'
        startIcon={<SettingsBackupRestoreIcon />}
      >
        Reset
      </Button>
      <Button
        id={`progressiveStepBuilder-${counter}`}
        onClick={handleCreate}
        // disabled={counter === publishActions.length}
        variant='text'
        color='primary'
        startIcon={<AddCircleOutlineIcon />}
      >
        add {publishActions[counter]}
      </Button>
    </ButtonGroup>
  );
};
