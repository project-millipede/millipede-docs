import { Archer } from '@app/components';
import { Scroll } from '@demonstrators-social/shared';
import React, { FC } from 'react';

import { Dock } from './Dock';
import { FlowBody } from './FlowBody';

const { ArcherSurface } = Archer;

interface FlowSurfaceProps {
  leftTimelineId: string;
  rightTimelineId: string;
}

export const FlowSurface: FC<FlowSurfaceProps> = ({
  leftTimelineId,
  rightTimelineId
}) => {
  return (
    <ArcherSurface
      strokeColor='gray'
      style={{
        height: '100%',
        overflow: 'hidden'
      }}
      elementStyle={{
        display: 'grid',
        gridTemplateColumns: '0.2fr minmax(0,1fr) 0.2fr',
        gridTemplateAreas: `'dock-left dock-center dock-right'`
      }}
    >
      <Dock
        styles={{
          position: 'relative',
          gridArea: 'dock-left'
        }}
        timelineId={leftTimelineId}
        position={Scroll.Timeline.DockPosition.Left}
      />
      <FlowBody />
      <Dock
        styles={{
          position: 'relative',
          gridArea: 'dock-right'
        }}
        timelineId={rightTimelineId}
        position={Scroll.Timeline.DockPosition.Right}
      />
    </ArcherSurface>
  );
};
