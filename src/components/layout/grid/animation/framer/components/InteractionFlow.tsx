/* eslint-disable import/no-named-as-default */
import { RefProvider } from 'docs/src/modules/components/archer/context/RefProvider';
import { TransitionProvider } from 'docs/src/modules/components/archer/context/TransitionProvider';
import React, { FC } from 'react';

import ArcherSurface from '../../../../../../../docs/src/modules/components/archer/ArcherSurface';
import { ArcherSurfaceObserver } from '../../../../../../../docs/src/modules/components/archer/ArcherSurfaceObserver';
import { Interaction } from './Interaction';
import { InteractionBody } from './InteractionBody';

interface InteractionFlowProps {
  leftTimelineId: string;
  rightTimelineId: string;
  offSetControls: number;
}

export const InteractionFlow: FC<InteractionFlowProps> = ({
  leftTimelineId,
  rightTimelineId,
  offSetControls
}) => {
  return (
    <RefProvider>
      <TransitionProvider>
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
      </TransitionProvider>
    </RefProvider>
  );
};
