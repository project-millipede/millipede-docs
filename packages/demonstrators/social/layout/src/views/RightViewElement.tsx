import { ViewElementProps } from '@demonstrator/navigation';
import { features } from '@demonstrators-social/shared';
import React, { FC, memo, useLayoutEffect, useRef } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { Post } from '../components/post';
import { Timeline } from '../components/timeline';

export const RightViewElement: FC<ViewElementProps> = ({
  parentId,
  isMobile
}) => {
  const {
    timeline: {
      selector: { useCaseSelector }
    },
    viewport: {
      selector: {
        // viewportItemSelector,
        viewportNextItemSelector
      }
    },
    scroll: {
      timeline: {
        states: { timelineViewState }
      }
    }
  } = features;

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const useCase = useRecoilValue(useCaseSelector);

  const { timelines } = useCase;

  const [otherTimeline, timeline] = timelines;

  const { id: timelineId } = timeline || { id: '' };

  const { activeTab } = useRecoilValue(timelineViewState(timelineId));

  // const getViewportItem = useRecoilCallback(
  //   ({ snapshot }) =>
  //     (timelineId: string) => {
  //       const viewportItemValue = snapshot
  //         .getLoadable(viewportItemSelector(timelineId))
  //         .getValue();
  //       return viewportItemValue;
  //     }
  // );

  // Scroll-restoration V1
  // useEffect(() => {
  //   if (timeline) {
  //     const { offsetTop } = getViewportItem(timeline.id);
  //     scrollContainerRef.current.scroll(0, offsetTop + 1);
  //   }
  // }, [parentId, isMobile]);

  const getViewportItem = useRecoilCallback(
    ({ snapshot }) =>
      (timelineId: string) => {
        const viewportItemValue = snapshot
          .getLoadable(viewportNextItemSelector(timelineId))
          .getValue();
        return viewportItemValue;
      }
  );

  // Scroll-restoration V2 - important - this has to be layoutEffect - TODO: Document necessary steps
  useLayoutEffect(() => {
    if (timeline) {
      const viewport = getViewportItem(timeline.id);
      if (viewport.viewportItem) {
        const { id } = viewport.viewportItem;
        const el = document.getElementById(id);
        if (el) {
          // why + 1 ???
          scrollContainerRef.current.scroll(0, el.offsetTop + 1);
        } else {
          scrollContainerRef.current.scroll(0, 0);
        }
      }
    }
  }, [parentId, isMobile, activeTab]);

  const timelineComponent = timeline && (
    <Timeline
      timelineId={timeline.id}
      otherTimelineId={otherTimeline.id}
      ref={scrollContainerRef}
      Comp={Post}
    />
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      {timelineComponent}
    </div>
  );
};

export default memo(RightViewElement);
