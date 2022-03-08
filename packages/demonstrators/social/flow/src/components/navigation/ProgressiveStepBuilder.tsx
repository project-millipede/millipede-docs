import { features as appComponentFeatures } from '@app/components';
import { CollectionUtil } from '@app/utils';
import { features, Scroll } from '@demonstrators-social/shared';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useMemo, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const NavigationBtnPlaceholder = styled('div')({
  width: '22px',
  height: '22px'
});

/**
 * The progressive step builder targets the first post.
 * The builder uses either
 * - the first post from the pre-generated list of posts or
 * - a manually created post.
 *
 * The slice targets of a post may vary.
 *
 * Declarations:
 *
 * - Identical source and target slices.
 * const sliceIds = 'media';
 *
 * - Different source and target slices.
 * const sliceIds = ['media', 'content'];
 */

export const ProgressiveStepBuilder: FC = () => {
  const {
    scroll: {
      timeline: {
        states: { nodesWithRelationsWithEdgeState },
        selector: { actionCursorLengthSelector },
        actions: { addTopic, createNodesWithRelations },
        constants: { actionPlan }
      }
    },
    timeline: {
      selector: { useCaseSelector, interactionDataForPostScenarioSelector }
    }
  } = features;

  const {
    archer: {
      states: { archerTransitionComposedState }
    }
  } = appComponentFeatures;

  const actions = get(actionPlan, 'publish');

  const sliceIds = 'media';

  const { t } = useTranslation();

  const [ltr, setLtr] = useState(true);

  const useCase = useRecoilValue(useCaseSelector);

  const { timelines } = useCase;

  const [leftTimeline, rightTimeline] = timelines;

  const actionCursor = useRecoilValue(actionCursorLengthSelector);

  const [activePostId] = useRecoilValue(
    interactionDataForPostScenarioSelector(ltr)
  );

  const resultMinusLast = useMemo(() => {
    const flowActions = CollectionUtil.Array.withoutBorders<string>(
      actions,
      actions.length,
      ltr
    );

    const resultMinusLast = flowActions.slice(0, flowActions.length - 1);
    return resultMinusLast;
  }, [actions, ltr]);

  const [progressiveActions, nextAction] = useMemo(() => {
    const actionsWithTopic = addTopic(
      actions,
      'publish',
      'pages/pidp/use-case/recognition/index:'
    );

    const progressiveActions = actionsWithTopic.slice(0, actionCursor + 1);

    /**
     * Array slice function with the argument set to -1 is used to create a new Array
     * containing only the last item of the original Array; you can then use destructuring
     * assignment to create a variable using the first item of that new Array.
     */

    const [nextAction] = progressiveActions.slice(-1);

    return [progressiveActions, nextAction];
  }, [actions, actionCursor]);

  const handleCreate = useRecoilCallback(
    ({ set }) =>
      (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const nodesWithRelations = [activePostId].reduce<{
          [key: string]: Array<Scroll.Timeline.NodeWithRelationsWithEdge>;
        }>((acc, postId) => {
          const nodeWithRelationsWithEdge = createNodesWithRelations(
            progressiveActions,
            t,
            ltr,
            Scroll.Timeline.LAYOUT.PROGRESSIVE,
            resultMinusLast
          )(
            ltr
              ? [leftTimeline.id, rightTimeline.id]
              : [rightTimeline.id, leftTimeline.id],
            postId,
            sliceIds
          );

          return {
            ...acc,
            [postId]: [nodeWithRelationsWithEdge]
          };
        }, {});

        set(nodesWithRelationsWithEdgeState, state => {
          return {
            ...state,
            nodesWithRelations,
            activeId: activePostId,
            finalSize: actions.length
          };
        });
      },
    [
      leftTimeline?.id,
      rightTimeline?.id,
      activePostId,
      progressiveActions,
      resultMinusLast,
      ltr
    ]
  );

  /**
   * Resetting the data structure generated in the creation handler and those created subsequently
   *
   * Reset implicitly created state nodes-with-relations-with-edge.
   * Reset subsequent state transition composed state archer-transition-composed,
   * build while progressively adding new archer elements,
   * - persisting all transition-ids from an atom-family
   * - recomputing the respective arrow mesh.
   * Note:
   * The reset of archer elements and their respective transitions gets handled
   * in an archer-element effect (unmount - segment).
   */

  const handleReset = useRecoilCallback(
    ({ reset }) =>
      (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        reset(nodesWithRelationsWithEdgeState);
        reset(archerTransitionComposedState);
      },
    []
  );

  const handleLtr = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLtr(state => !state);
  };

  return (
    <ButtonGroup variant='text' color='primary' size='large' fullWidth>
      <Button
        id={`psb-reset`}
        onClick={handleReset}
        variant='text'
        color='primary'
        startIcon={<SettingsBackupRestoreIcon />}
      >
        Reset
      </Button>
      <Button
        id={`psb-ltr`}
        onClick={handleLtr}
        variant='text'
        color='primary'
        startIcon={!ltr ? <ArrowBack /> : <NavigationBtnPlaceholder />}
        endIcon={ltr ? <ArrowForward /> : <NavigationBtnPlaceholder />}
      >
        {ltr ? 'Left to Right' : 'Right to Left'}
      </Button>
      <Button
        id={`psb-${actionCursor}`}
        onClick={handleCreate}
        disabled={!(actionCursor <= actions.length - 1)}
        variant='text'
        color='primary'
        startIcon={<AddCircleOutlineIcon />}
      >
        add {nextAction.id}
      </Button>
    </ButtonGroup>
  );
};
