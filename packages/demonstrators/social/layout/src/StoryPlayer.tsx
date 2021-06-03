import { useHoux } from '@app/houx';
import { StringUtil } from '@app/utils';
import { playerLayoutState } from '@demonstrator/components/src/player/context/reducer';
import { FlowPlayControl, getSteps } from '@demonstrators-social/flow';
import { RootState } from '@demonstrators-social/shared';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { PlayerSheet as RelativePlayerSheet } from './PlayerSheet';
import { PlayerSheet as AbsolutePlayerSheet } from './PlayerSheetWithSnaps';

const renderRelative = true;

export const StoryPlayer: FC = () => {
  const { topic } = useRecoilValue(playerLayoutState);

  const {
    state
  }: {
    state: RootState;
  } = useHoux();

  // getSteps gets used in the form of a hook here
  const playlist = getSteps(state) || [];

  const selectedPlaylistItemSteps = useMemo(() => {
    if (!StringUtil.isEmptyString(topic)) {
      const [steps] = playlist
        .filter(value => value.id === topic)
        .map(value => value.steps);
      return steps;
    }
    return [];
  }, [topic, playlist]);

  // return (
  //   <>
  //     <RelativePlayerSheet
  //       steps={selectedPlaylistItemSteps}
  //       playlist={playlist}
  //     />
  //     <FlowPlayControl steps={selectedPlaylistItemSteps} topic={topic} />
  //   </>
  // );

  return renderRelative ? (
    <div
      style={{
        position: 'relative'
      }}
    >
      <RelativePlayerSheet
        steps={selectedPlaylistItemSteps}
        playlist={playlist}
      />
      <FlowPlayControl steps={selectedPlaylistItemSteps} topic={topic} />
    </div>
  ) : (
    <>
      <AbsolutePlayerSheet
        steps={selectedPlaylistItemSteps}
        playlist={playlist}
      />
      <FlowPlayControl steps={selectedPlaylistItemSteps} topic={topic} />
    </>
  );
};
