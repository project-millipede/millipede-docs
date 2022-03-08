import { Player } from '@demonstrator/components';
import { Components } from '@demonstrators-social/flow';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { LayoutVariants, PlayerSheet } from './PlayerSheet';

// import { PlayerSheet as PlayerSheetWithSnaps } from './PlayerSheetWithSnaps';

const { FlowPlayControl } = Components;

export const StoryPlayer: FC = () => {
  const {
    layout: {
      states: { playerLayoutState },
      selector: { storySelector }
    }
  } = Player.features;

  const { topic, playlist } = useRecoilValue(playerLayoutState);

  const story = useRecoilValue(storySelector(topic));

  // Modern version - with relative layout
  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <PlayerSheet
        playlist={playlist}
        steps={story.steps}
        layout={LayoutVariants.Relative}
      />
      <FlowPlayControl steps={story.steps} topic={topic} />
    </div>
  );

  // Modern version - with absolute layout
  // return (
  //   <>
  //     <PlayerSheet
  //       playlist={playlist}
  //       steps={story.steps}
  //       layout={LayoutVariants.Absolute}
  //     />
  //     <FlowPlayControl steps={story.steps} topic={topic} />
  //   </>
  // );

  // Previous version, but also very interesting - with absolute layout
  // return (
  //   <>
  //     <PlayerSheetWithSnaps steps={story.steps} playlist={playlist} />
  //     <FlowPlayControl steps={story.steps} topic={topic} />
  //   </>
  // );
};
