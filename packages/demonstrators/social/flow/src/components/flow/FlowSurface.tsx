import { Archer } from '@app/components';
import React, { FC } from 'react';

import { ArcherSurfaceObserver } from '../observer/ArcherSurfaceObserver';
import { Dock } from './Dock';
import { DockPosition } from './Dock.svc';
import FlowBody from './FlowBody';

const { ArcherSurface } = Archer;

interface FlowSurfaceProps {
  leftTimelineId: string;
  rightTimelineId: string;
  offSetControls: number;
}

export const FlowSurface: FC<FlowSurfaceProps> = ({
  leftTimelineId,
  rightTimelineId,
  offSetControls
}) => {
  return (
    <ArcherSurfaceObserver
      timelineIds={[leftTimelineId, rightTimelineId]}
      render={renderProps => {
        return (
          <ArcherSurface
            noCurves
            strokeColor='gray'
            style={{
              height: '100%',
              overflow: 'hidden'
            }}
            elementStyle={{
              display: 'flex'
            }}
            {...renderProps}
          >
            <div
              style={{
                width: '15%'
              }}
            >
              <Dock
                styles={{
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}
                timelineId={leftTimelineId}
                offSet={offSetControls}
                position={DockPosition.left}
              />
            </div>
            <div
              style={{
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <FlowBody />
            </div>
            <div
              style={{
                width: '15%'
              }}
            >
              <Dock
                styles={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
                timelineId={rightTimelineId}
                offSet={offSetControls}
                position={DockPosition.right}
              />
            </div>
          </ArcherSurface>
        );
      }}
    />
  );
};
