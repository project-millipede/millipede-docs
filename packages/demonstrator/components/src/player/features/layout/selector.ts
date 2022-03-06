import { features } from '@demonstrators-social/shared';
import { selectorFamily } from 'recoil';

import { Step } from '../..';
import { Story, storyState } from './states';

export const storySelector = selectorFamily<Story, string>({
  key: 'story-selector',
  get:
    storyId =>
    ({ get }) => {
      const story = get(storyState(storyId));
      return story;
    },
  set:
    storyId =>
    ({ set, get }, newStory) => {
      const {
        timeline: {
          selector: { useCaseSelector, postIdsOfOwnerSelector, SortDirection }
        }
      } = features;

      const useCase = get(useCaseSelector);

      const { timelines } = useCase;

      const [leftTimeline, rightTimeline] = timelines;

      const leftTimelinePostIdsOwner = get(
        postIdsOfOwnerSelector({
          timelineId: leftTimeline.id,
          sortDirection: SortDirection.DECS
        })
      );

      const [postId] =
        leftTimelinePostIdsOwner && leftTimelinePostIdsOwner.length > 0
          ? leftTimelinePostIdsOwner
          : [];

      const steps1: Array<Step> = [
        {
          start: 0,
          end: 5000,
          label: '1',
          selector: `timeline-${leftTimeline.id}-tab-posts`,
          description:
            'pages/pidp/use-case/recognition/index:timeline-tab-posts'
          // viewSelector: 'LeftViewElement'
        },
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
        {
          start: 15000,
          end: 16000,
          label: '4',
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`,
          viewSelector: 'ViewElement'
        },
        {
          start: 16000,
          end: 20000,
          label: '5',
          selector: `psb-${0}`,
          description:
            'pages/pidp/use-case/recognition/index:timeline-tab-posts'
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
          end: 34000,
          label: '8',
          selector: `psb-${3}`,
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-3`
        },
        {
          start: 34000,
          end: 35000,
          label: '9',
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-3`,
          viewSelector: 'RightViewElement'
        }
      ];

      const steps: Array<Step> = [
        {
          start: 0,
          end: 2500,
          label: '1',
          selector: `timeline-${leftTimeline.id}-tab-posts`,
          description:
            'pages/pidp/use-case/recognition/index:timeline-tab-posts',
          viewSelector: 'LeftViewElement'
        },
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
        }
        // {
        //   start: 10000,
        //   end: 15000,
        //   label: '3',
        //   selector: `timeline-${rightTimeline.id}-content-post`,
        //   description: `pages/pidp/use-case/recognition/index:timeline-content-post`
        // }
      ];

      const stepsX: Array<Step> = [
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
          label: '2',
          selector: `timeline-${rightTimeline.id}-tab-timeline`,
          description:
            'pages/pidp/use-case/recognition/index:timeline-tab-timeline',
          viewSelector: 'RightViewElement'
        },
        {
          start: 5000,
          end: 10000,
          label: '3',
          selector: `timeline-${rightTimeline.id}-post-${postId}-comment-create`,
          description: `pages/pidp/use-case/recognition/index:timeline-content-create`
        },
        {
          start: 10000,
          end: 15000,
          label: '4',
          selector: `timeline-${rightTimeline.id}-content-post`,
          description: `pages/pidp/use-case/recognition/index:timeline-content-post`
        }
      ];

      console.log('steps: ', steps1);
      console.log('steps: ', stepsX);

      const updatedStory = {
        ...newStory,
        steps
      };

      set(storyState(storyId), updatedStory);
    }
});
