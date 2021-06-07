import { CollectionUtil } from '@app/utils';
import { PlayListItem } from '@demonstrator/components/src/player/types';
import { RootState, scrollStates, selectors } from '@demonstrators-social/shared';
import { useResetRecoilState } from 'recoil';

// currently a hook with false name

export const getSteps = (state: RootState): Array<PlayListItem> => {
  // use selectors to get relevant data for steps
  const useCase = (state.timeline &&
    selectors.timeline.selectUserCaseState(state)) || {
    id: '',
    timelines: []
  };

  const { timelines = [] } = useCase;
  const [leftTimeline, rightTimeline] = timelines;

  const leftTimelinePostIdsOwner =
    leftTimeline &&
    leftTimeline.id &&
    selectors.timeline.selectPostsOfOwner(
      leftTimeline.id,
      CollectionUtil.Array.compareDescFn('content.createdAt')
    )(state);

  const [postId] =
    leftTimelinePostIdsOwner && leftTimelinePostIdsOwner.length > 0
      ? leftTimelinePostIdsOwner
      : [];

  const {
    timeline: { nodesWithRelationsWithEdgeState }
  } = scrollStates;

  const resetNodesWithRelationsWithEdge = useResetRecoilState(
    nodesWithRelationsWithEdgeState
  );

  const handleReset = () => {
    resetNodesWithRelationsWithEdge();
  };

  const steps =
    leftTimeline && leftTimeline.id && rightTimeline && rightTimeline.id
      ? [
          {
            id: 'publish_content_unprotected',
            title: 'Veröffentlichung von Inhalten, ungeschützt',
            description: 'Übergabe der Inhalte an den Anbieter',
            steps: [
              // programmatical reset
              {
                start: 0,
                end: 100,
                label: '0',
                selector: handleReset,
                description:
                  'pages/pidp/use-case/recognition/index:timeline-tab-posts'
              },
              // interactive reset
              // {
              //   start: 0,
              //   end: 100,
              //   label: '0',
              //   selector: `progressiveStepBuilder-reset`,
              //   description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`
              // },
              {
                start: 100,
                end: 5000,
                label: '1',
                selector: `timeline-${leftTimeline.id}-tab-posts`,
                description:
                  'pages/pidp/use-case/recognition/index:timeline-tab-posts'
                // viewSelector: 'LeftViewElement'
              },
              // optional
              // {
              //   start: 2500,
              //   end: 5000,
              //   label: '1',
              //   selector: `timeline-${rightTimeline.id}-tab-timeline`,
              //   description:
              //     'pages/pidp/use-case/recognition/index:timeline-tab-timeline'
              // },
              {
                start: 5000,
                end: 10000,
                label: '2',
                selector: `timeline-${leftTimeline.id}-content-create`,
                description: `pages/pidp/use-case/recognition/index:timeline-content-create`
              },
              {
                start: 10000,
                end: 15000,
                label: '3',
                selector: `timeline-${leftTimeline.id}-content-post`,
                description: `pages/pidp/use-case/recognition/index:timeline-content-post`
              },

              // // new
              // {
              //   start: 15250,
              //   end: 16000,
              //   label: '0',
              //   description:
              //     'pages/pidp/use-case/recognition/index:timeline-tab-posts',
              //   viewSelector: 'ViewElement'
              // },
              // {
              //   start: 15750,
              //   end: 20000,
              //   label: '4',
              //   selector: `progressiveStepBuilder-${0}`,
              //   description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`
              //   // viewSelector: 'ViewElement'
              // },

              // new
              {
                start: 15000,
                end: 19000,
                label: '4',
                selector: `progressiveStepBuilder-${0}`,
                description:
                  'pages/pidp/use-case/recognition/index:timeline-tab-posts'
              },
              {
                start: 19000,
                end: 20000,
                label: '5',
                description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`,
                viewSelector: 'ViewElement'
              },
              {
                start: 20000,
                end: 25000,
                label: '6',
                selector: `progressiveStepBuilder-${1}`,
                description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-1`
              },
              {
                start: 25000,
                end: 30000,
                label: '7',
                selector: `progressiveStepBuilder-${2}`,
                description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-2`
              },
              {
                start: 30000,
                end: 35000,
                label: '8',
                selector: `progressiveStepBuilder-${3}`,
                description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-3`
              },
              {
                start: 35000,
                end: 36000,
                label: '9',
                description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-3`,
                viewSelector: 'RightViewElement'
              }
            ]
          },
          {
            id: 'publish_comment',
            title: 'Reaktion zu Inhalten',
            description: 'Anbieter messen jede Interaktion des Bedieners',
            steps: [
              // programmatical reset
              {
                start: 0,
                end: 100,
                label: '0',
                selector: handleReset,
                description:
                  'pages/pidp/use-case/recognition/index:timeline-tab-timeline'
              },
              // {
              //   start: 100,
              //   end: 2500,
              //   label: '1',
              //   selector: `timeline-${rightTimeline.id}-tab-timeline`,
              //   description:
              //     'pages/pidp/use-case/recognition/index:timeline-tab-timeline'
              // },
              // // optional
              // {
              //   start: 2500,
              //   end: 5000,
              //   label: '1',
              //   selector: `timeline-${leftTimeline.id}-tab-posts`,
              //   description:
              //     'pages/pidp/use-case/recognition/index:timeline-tab-posts'
              // },

              {
                start: 100,
                end: 2500,
                label: '1',
                selector: `timeline-${leftTimeline.id}-tab-posts`,
                description:
                  'pages/pidp/use-case/recognition/index:timeline-tab-posts',
                viewSelector: 'LeftViewElement'
              },
              // optional
              {
                start: 2500,
                end: 5000,
                label: '1',
                selector: `timeline-${rightTimeline.id}-tab-timeline`,
                description:
                  'pages/pidp/use-case/recognition/index:timeline-tab-timeline',
                viewSelector: 'RightViewElement'
              },
              {
                start: 5000,
                end: 10000,
                label: '2',
                selector: `timeline-${rightTimeline.id}-post-${postId}-comment-create`,
                description: `pages/pidp/use-case/recognition/index:timeline-content-create`
              },
              {
                start: 10000,
                end: 15000,
                label: '3',
                selector: `timeline-${rightTimeline.id}-content-post`,
                description: `pages/pidp/use-case/recognition/index:timeline-content-post`
              }
            ]
          }
        ]
      : [];

  return steps;
};
