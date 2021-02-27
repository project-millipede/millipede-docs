import { CollectionUtil } from '@app/utils';
import { PlayListItem } from '@demonstrator/components/src/player/types';
import { selectors } from '@demonstrators-social/shared';
import { selectPostsOfOwner } from '@demonstrators-social/shared/src/redux/features/timeline/selector';

interface Topic {
  id: string;
  title: string;
  description: string;
}

export const getSteps = (state): Array<PlayListItem> => {
  // use selectors to get relevant data for steps
  const useCase = (state.timeline &&
    selectors.timeline.selectUserCaseState(state)) || {
    id: '',
    timelines: []
  };

  const { timelines = [] } = useCase;
  const [leftTimeline, rightTimeline] = timelines;

  const rightTimelinePostIdsOwner = selectPostsOfOwner(
    rightTimeline.id,
    CollectionUtil.Array.compareDescFn('content.createdAt')
  )(state);

  const [postId] = rightTimelinePostIdsOwner;

  return [
    {
      id: 'publish_content_unprotected',
      title: 'Veröffentlichung von Inhalten, ungeschützt',
      description: 'Übergabe der Inhalte an den Anbieter',
      steps: [
        {
          start: 0,
          end: 5000,
          label: '1',
          selector: `timeline-${leftTimeline.id}-tab-posts`,
          description:
            'pages/pidp/use-case/recognition/index:timeline-tab-posts'
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
        // new
        {
          start: 15000,
          end: 17000,
          label: '4',
          selector: `progressiveStepBuilder-reset`,
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`
        },
        {
          start: 17000,
          end: 20000,
          label: '4',
          selector: `progressiveStepBuilder-${0}`,
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`
        },
        {
          start: 20000,
          end: 25000,
          label: '5',
          selector: `progressiveStepBuilder-${1}`,
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-1`
        },
        {
          start: 25000,
          end: 30000,
          label: '6',
          selector: `progressiveStepBuilder-${2}`,
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-2`
        },
        {
          start: 30000,
          end: 35000,
          label: '7',
          selector: `progressiveStepBuilder-${3}`,
          description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-3`
        }
      ]
    },
    {
      id: 'publish_comment',
      title: 'Reaktion zu Inhalten',
      description: 'Anbieter messen jede Interaktion des Bedieners',
      steps: [
        {
          start: 0,
          end: 5000,
          label: '1',
          selector: `timeline-${rightTimeline.id}-tab-posts`,
          description:
            'pages/pidp/use-case/recognition/index:timeline-tab-posts'
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
  ];
};

export const getTopics = (): Array<Topic> => {
  return [
    {
      id: 'publish_content_unprotected',
      title: 'Veröffentlichung von Inhalten, ungeschützt',
      description: 'Übergabe der Inhalte an den Anbieter'
    },
    {
      id: 'publish_comment',
      title: 'Reaktion zu Inhalten',
      description: 'Anbieter messen jede Interaktion des Bedieners'
    }
  ];
};
