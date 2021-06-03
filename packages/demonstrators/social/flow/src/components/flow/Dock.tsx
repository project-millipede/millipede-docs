import { HooksUtils } from '@app/render-utils';
import { scrollSelectors } from '@demonstrators-social/shared';
import React, { CSSProperties, FC, memo, useLayoutEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { TDockPosition } from './Dock.svc';
import { DockItem } from './DockItem';

export interface DockProps {
  timelineId: string;
  offSet?: number;
  styles?: CSSProperties;
  position: TDockPosition;
}

export const Dock: FC<DockProps> = ({
  timelineId,
  offSet,
  styles,
  position
}) => {
  const {
    timeline: { refContainerScrollSelector, postIdsSelector }
  } = scrollSelectors;

  const setRefContainerScroll = useSetRecoilState(
    refContainerScrollSelector(timelineId)
  );

  const selectedPostIds = useRecoilValue(
    postIdsSelector({ timelineId: timelineId, position: position })
  );

  const [containerRef, containerBounds] = HooksUtils.useScroll({
    // relaxing a more heavy weight scroll with capture setting debounce rate to 300ms
    debounce: 300
  });

  useLayoutEffect(() => {
    setRefContainerScroll(_ => containerRef);
    return () => {
      setRefContainerScroll(_ => undefined);
    };
  }, [selectedPostIds.length]);

  return (
    <div
      key={`dock-${timelineId}`}
      style={{
        ...styles
      }}
    >
      {selectedPostIds.map(postId => {
        return (
          <DockItem
            key={`dock-${timelineId}-${postId}`}
            postId={postId}
            timelineId={timelineId}
            containerScroll={containerBounds}
            offSet={offSet}
          />
        );
      })}
    </div>
  );
};

export default memo(Dock);
