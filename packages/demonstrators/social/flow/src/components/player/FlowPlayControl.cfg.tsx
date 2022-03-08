// import { features as appComponentFeatures } from '@app/components';
import { Player } from '@demonstrator/components';
import { features } from '@demonstrators-social/shared';
import { useRecoilValue } from 'recoil';

export const getPlaylist = (): Array<Player.PlayListItem> => {
  const playList = [
    {
      id: 'publish_content_unprotected',
      title: 'Veröffentlichung von Inhalten, ungeschützt',
      description: 'Übergabe der Inhalte an den Anbieter',
      steps: []
    },
    {
      id: 'publish_comment',
      title: 'Reaktion zu Inhalten',
      description: 'Anbieter messen jede Interaktion des Bedieners',
      steps: []
    }
  ];
  return playList;
};

const leftTimeline = { id: '' };

export const playListSteps = {
  publish_content_unprotected: {
    '1': {
      start: 0,
      end: 5000,
      label: '1',
      selector: `timeline-${leftTimeline.id}-tab-posts`,
      description: 'pages/pidp/use-case/recognition/index:timeline-tab-posts'
      // viewSelector: 'LeftViewElement'
    }
  }
};

export const getPlayListItem = (): Array<Player.Step> => {
  // const {
  //   scroll: {
  //     timeline: {
  //       states: { nodesWithRelationsWithEdgeState }
  //     }
  //   }
  // } = features;

  // const {
  //   archer: {
  //     states: { archerTransitionComposedState }
  //   }
  // } = appComponentFeatures;

  // execute before a new playlist item gets played
  // const handleReset = useRecoilCallback(
  //   ({ reset }) =>
  //     () => {
  //       reset(nodesWithRelationsWithEdgeState);
  //       reset(archerTransitionComposedState);
  //     },
  //   []
  // );

  return [
    // programmatical reset
    // {
    //   start: 0,
    //   end: 100,
    //   label: '0',
    //   selector: handleReset,
    //   description: 'pages/pidp/use-case/recognition/index:timeline-tab-posts'
    // }
    // interactive reset
    // {
    //   start: 0,
    //   end: 100,
    //   label: '0',
    //   selector: `psb-reset`,
    //   description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`
    // },
  ];
};

// TODO: Rename, this is a hook
export const getSteps = (): Array<Player.PlayListItem> => {
  const {
    // scroll: {
    // timeline: {
    //   states: { nodesWithRelationsWithEdgeState }
    // }
    // },
    timeline: {
      selector: { useCaseSelector, postIdsOfOwnerSelector, SortDirection }
    }
  } = features;

  // const {
  //   archer: {
  //     states: { archerTransitionComposedState }
  //   }
  // } = appComponentFeatures;

  const useCase = useRecoilValue(useCaseSelector);

  const { timelines } = useCase;

  const [leftTimeline, rightTimeline] = timelines;

  const { id: leftTimelineId } = leftTimeline || { id: '' };

  const leftTimelinePostIdsOwner = useRecoilValue(
    postIdsOfOwnerSelector({
      timelineId: leftTimelineId,
      sortDirection: SortDirection.DECS
    })
  );

  const [postId] =
    leftTimelinePostIdsOwner && leftTimelinePostIdsOwner.length > 0
      ? leftTimelinePostIdsOwner
      : [];

  // const handleReset = useRecoilCallback(
  //   ({ reset }) =>
  //     () => {
  //       reset(nodesWithRelationsWithEdgeState);
  //       reset(archerTransitionComposedState);
  //     },
  //   []
  // );

  const steps =
    leftTimeline && leftTimeline.id && rightTimeline && rightTimeline.id
      ? [
          {
            id: 'publish_content_unprotected',
            title: 'Veröffentlichung von Inhalten, ungeschützt',
            description: 'Übergabe der Inhalte an den Anbieter',
            steps: [
              // programmatical reset - out
              // {
              //   start: 0,
              //   end: 100,
              //   label: '0',
              //   selector: handleReset,
              //   description:
              //     'pages/pidp/use-case/recognition/index:timeline-tab-posts'
              // },

              // interactive reset
              // {
              //   start: 0,
              //   end: 100,
              //   label: '0',
              //   selector: `psb-reset`,
              //   description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`
              // },
              {
                start: 0,
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
                selector: `psb-${0}`,
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
                selector: `psb-${1}`,
                description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-1`
              },
              {
                start: 25000,
                end: 30000,
                label: '7',
                selector: `psb-${2}`,
                description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-2`
              },
              {
                start: 30000,
                end: 35000,
                label: '8',
                selector: `psb-${3}`,
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
              // programmatical reset - out
              // {
              //   start: 0,
              //   end: 100,
              //   label: '0',
              //   selector: handleReset,
              //   description:
              //     'pages/pidp/use-case/recognition/index:timeline-tab-timeline'
              // },
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
                start: 0,
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
