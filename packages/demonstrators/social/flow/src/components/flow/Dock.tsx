import { HooksUtils } from '@app/render-utils';
import { features, Scroll } from '@demonstrators-social/shared';
import React, { CSSProperties, FC, memo, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { DockItem } from './DockItem';

export interface DockProps {
  timelineId: string;
  position: Scroll.Timeline.TDockPosition;
  styles?: CSSProperties;
}

export const Dock: FC<DockProps> = ({ timelineId, position, styles }) => {
  const {
    scroll: {
      timeline: {
        selector: { refContainerScrollSelector, dockedPostIdsSelector }
      }
    }
  } = features;

  const setRefContainerScroll = useSetRecoilState(
    refContainerScrollSelector(timelineId)
  );

  const resetRefContainerScroll = useResetRecoilState(
    refContainerScrollSelector(timelineId)
  );

  const dockedPostIds = useRecoilValue(
    dockedPostIdsSelector({ timelineId: timelineId, position: position })
  );

  const [containerRef, containerBounds] = HooksUtils.useScroll({
    withOverflow: false,
    // relaxing a more heavy weight scroll with capture setting debounce rate to 256ms
    debounce: 0
  });

  useEffect(() => {
    setRefContainerScroll(() => containerRef);
    return () => {
      resetRefContainerScroll();
    };
  }, [dockedPostIds]);

  return (
    <div
      key={`dock-${timelineId}`}
      style={{
        ...styles
      }}
    >
      {dockedPostIds.map(postId => {
        return (
          <DockItem
            key={`dock-${timelineId}-${postId}`}
            postId={postId}
            timelineId={timelineId}
            containerScroll={containerBounds}
          />
        );
      })}
    </div>
  );
};

export default memo(Dock);
