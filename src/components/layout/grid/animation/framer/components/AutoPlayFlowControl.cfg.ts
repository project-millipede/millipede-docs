export interface Step {
  start: number;
  end: number;
  label: string;
  selector: string;
  description: string;
  timelineId?: string;
}

export const getSteps = (
  timelineId: string,
  _rightTimelineId: string
): {
  [key: string]: Array<Step>;
} => {
  return {
    standard: [
      {
        start: 0,
        end: 5000,
        label: '1',
        selector: `timeline-${timelineId}-tab-posts`,
        description: 'pages/pidp/use-case/recognition/index:timeline-tab-posts',
        timelineId: ''
      },
      {
        start: 5000,
        end: 10000,
        label: '2',
        selector: `timeline-${timelineId}-content-create`,
        description: `pages/pidp/use-case/recognition/index:timeline-content-create`
      },
      {
        start: 10000,
        end: 15000,
        label: '3',
        selector: `timeline-${timelineId}-content-post`,
        description: `pages/pidp/use-case/recognition/index:timeline-content-post`
      },
      {
        start: 15000,
        end: 20000,
        label: '4',
        selector: `progressiveStepBuilder-${0}`,
        description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-0`,
        timelineId
      },
      {
        start: 20000,
        end: 25000,
        label: '5',
        selector: `progressiveStepBuilder-${1}`,
        description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-1`,
        timelineId
      },
      {
        start: 25000,
        end: 30000,
        label: '6',
        selector: `progressiveStepBuilder-${2}`,
        description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-2`,
        timelineId
      },
      {
        start: 30000,
        end: 40000,
        label: '7',
        selector: `progressiveStepBuilder-${3}`,
        description: `pages/pidp/use-case/recognition/index:progressiveStepBuilder-3`,
        timelineId
      }
    ]
  };
};
