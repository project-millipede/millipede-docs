import React from 'react';

import MusicPreview from './musicPreview';
import SettingsPreview from './settingsPreview';

// import GamesPreview from './GamesPreview';
export enum PREVIEW {
  MUSIC = 'music',
  GAMES = 'games',
  SETTINGS = 'settings'
}

export const Previews = {
  [PREVIEW.MUSIC]: () => <MusicPreview />,
  //   [PREVIEW.GAMES]: () => <GamesPreview />,
  [PREVIEW.SETTINGS]: () => <SettingsPreview />
};
