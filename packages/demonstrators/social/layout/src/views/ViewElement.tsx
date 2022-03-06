import { ViewElementProps } from '@demonstrator/navigation';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { features } from '@demonstrators-social/shared';
import React, { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';

const { FlowSurface } = FlowComponents;

export const ViewElement: FC<ViewElementProps> = () => {
  const {
    timeline: {
      selector: { useCaseSelector }
    }
  } = features;

  const useCase = useRecoilValue(useCaseSelector);

  const { timelines } = useCase;

  const [leftTimeline, rightTimeline] = timelines;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <FlowSurface
        leftTimelineId={leftTimeline?.id}
        rightTimelineId={rightTimeline?.id}
      />
    </div>
  );
};

export default memo(ViewElement);
