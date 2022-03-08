import { features as appComponentFeatures } from '@app/components';
import { CollectionUtil } from '@app/utils';
import { features, Scroll } from '@demonstrators-social/shared';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import ExtensionIcon from '@mui/icons-material/Extension';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { getSliceId } from './SliceBuilder.svc';

const NavigationBtnPlaceholder = styled('div')({
  width: '22px',
  height: '22px'
});

/**
 * The slice builder targets all posts published by an author.
 * Each post of an author gets linked to a related post, incoming in the viewer's timeline.
 * Enabled sub-sections called slices of a post are respectively synchronized; visualized using arrows.
 *
 * Enabled slice targets of a post may vary.
 *
 * Note:
 * The multi-row slice builder and the standard version share the identical implementation detail;
 * see function handle-create.
 *
 * The difference is that the standard version allows you a flexible slice selection meaning used
 * interaction options are configurable, unlike the multi-row slice builder in which the slice
 * configuration is hard-wired.
 *
 * Declarations:
 *
 * - Configurable source and target slices; enabled slices are synchronized!
 * const sliceIdBlocks = useRecoilValue(interactionOptionsSelector);
 */

export const SliceBuilder: FC = () => {
  const {
    scroll: {
      timeline: {
        states: { nodesWithRelationsWithEdgeState },
        actions: { createNodesWithRelations },
        constants: { actionPlan }
      },
      interaction: {
        selector: { interactionOptionsSelector }
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

  const actions = get(actionPlan, 'base');

  const { t } = useTranslation();

  const [ltr, setLtr] = useState(true);

  const useCase = useRecoilValue(useCaseSelector);

  const { timelines } = useCase;

  const [leftTimeline, rightTimeline] = timelines;

  const { id: leftTimelineId } = leftTimeline || { id: '' };
  const { id: rightTimelineId } = rightTimeline || { id: '' };

  const sliceIdBlocks = useRecoilValue(interactionOptionsSelector);

  // const sliceIdBlocks: Array<
  //   Scroll.Interaction.TSliceVariant | Array<Scroll.Interaction.TSliceVariant>
  // > = [
  //   ['media', 'media'],
  //   ['sentiment', 'comments']
  // ];

  const postIds = useRecoilValue(interactionDataForPostScenarioSelector(ltr));

  const handleCreate = useRecoilCallback(
    ({ set }) =>
      (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const nodesWithRelations = postIds.reduce<{
          [key: string]: Array<Scroll.Timeline.NodeWithRelationsWithEdge>;
        }>((acc, postId) => {
          const nodeWithRelationsWithEdge = sliceIdBlocks.map(sliceIdBlock => {
            const actionsWithTopic = actions.map<Scroll.Timeline.Link>(
              (action, index, allActions) => {
                const sliceId = getSliceId(sliceIdBlock, index, allActions);
                return {
                  id: `${action}-${postId}-${sliceId}`,
                  nodeTranslationKey: `pages/pidp/use-case/recognition/index:publish-node-${action}`,
                  relationTranslationKey: `pages/pidp/use-case/recognition/index:publish-relation-${action}`
                };
              }
            );

            const flowActions =
              CollectionUtil.Array.withoutBorders<Scroll.Timeline.Link>(
                actionsWithTopic,
                actionsWithTopic.length,
                ltr
              );

            const flowActionsMinusLast = flowActions
              .slice(0, flowActions.length - 1)
              .map(a => a.id);

            return createNodesWithRelations(
              actionsWithTopic,
              t,
              ltr,
              Scroll.Timeline.LAYOUT.FULL,
              flowActionsMinusLast
            )(
              [
                ltr ? leftTimelineId : rightTimelineId,
                ltr ? rightTimelineId : leftTimelineId
              ],
              postId,
              sliceIdBlock
            );
          });

          return {
            ...acc,
            [postId]: nodeWithRelationsWithEdge
          };
        }, {});

        /**
         * Compared to other builders, all posts of the tab-configuration gets synchronized
         * (Author - POST <=> Viewer - TIMELINE)
         *
         * Important: Do not serve a value for the property activeId.
         */
        set(nodesWithRelationsWithEdgeState, state => {
          return {
            ...state,
            nodesWithRelations,
            finalSize: actions.length
          };
        });
      },
    [postIds, sliceIdBlocks, ltr]
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
        id={`sb-reset`}
        onClick={handleReset}
        variant='text'
        color='primary'
        startIcon={<SettingsBackupRestoreIcon />}
      >
        Reset
      </Button>
      <Button
        id={`sb-ltr`}
        onClick={handleLtr}
        variant='text'
        color='primary'
        startIcon={!ltr ? <ArrowBack /> : <NavigationBtnPlaceholder />}
        endIcon={ltr ? <ArrowForward /> : <NavigationBtnPlaceholder />}
      >
        {ltr ? 'Left to Right' : 'Right to Left'}
      </Button>
      <Button
        id={`sb-create`}
        onClick={handleCreate}
        variant='text'
        color='primary'
        startIcon={<ExtensionIcon />}
      >
        SliceBuilder
      </Button>
    </ButtonGroup>
  );
};
