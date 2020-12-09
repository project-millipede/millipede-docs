import { Archer } from '@app/components';
import React, { FC } from 'react';

import { ArcherSurfaceObserver } from '../observer/ArcherSurfaceObserver';
import { Interaction } from './Dock';
import { InteractionBody } from './FlowBody';

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
              <Interaction
                styles={{
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}
                timelineId={leftTimelineId}
                offSet={offSetControls}
                position='left'
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
              <InteractionBody />
            </div>
            <div
              style={{
                width: '15%'
              }}
            >
              <Interaction
                styles={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
                timelineId={rightTimelineId}
                offSet={offSetControls}
                position='right'
              />
            </div>
          </ArcherSurface>
        );
      }}
    />
  );
};
