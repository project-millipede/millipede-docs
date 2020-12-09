import { useHoux } from '@app/houx';
import { CollectionUtil } from '@app/utils';
import { RootState, scrollActions, scrollStates, ScrollTypes, selectors } from '@demonstrators-social/shared';
import { Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const publishActions = ['head', 'upload', 'download', 'tail'];

interface ProgressiveStepBuilderProps {
  leftTimelineId: string;
  rightTimelineId: string;
  ltr: boolean;
}

export const ns = 'pages/pidp/use-case/recognition/index';

export const ProgressiveStepBuilder: FC<ProgressiveStepBuilderProps> = ({
  leftTimelineId,
  rightTimelineId,
  ltr
}) => {
  const { t } = useTranslation();

  const {
    timeline: { nodesWithRelationsWithEdgeState, timelineViewState },
    post: { postIdsState }
  } = scrollStates;

  const [
    nodesWithRelationsWithEdge,
    setNodesWithRelationsWithEdge
  ] = useRecoilState(nodesWithRelationsWithEdgeState);

  const { counter } = nodesWithRelationsWithEdge;

  const timelineView = useRecoilValue(timelineViewState);

  const postIdsLeft = useRecoilValue(postIdsState(leftTimelineId));
  const postIdsRight = useRecoilValue(postIdsState(rightTimelineId));

  const {
    state
  }: {
    state: RootState;
  } = useHoux();

  const [
    activePostId
  ] = selectors.timeline.selectInteractionDataForPostScenario(
    ltr ? leftTimelineId : rightTimelineId,
    ltr ? rightTimelineId : leftTimelineId,
    ltr ? postIdsRight : postIdsLeft,
    timelineView.currentViews,
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
                ? [leftTimelineId, rightTimelineId]
                : [rightTimelineId, leftTimelineId],
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
          finalSize: publishActions.length,
          counter: counter + 1
        };
      });
    }
  };

  return (
    <Button
      id={`progressiveStepBuilder-${counter}`}
      onClick={handleCreate}
      disabled={counter === publishActions.length}
    >
      add {publishActions[counter]}
    </Button>
  );
};
