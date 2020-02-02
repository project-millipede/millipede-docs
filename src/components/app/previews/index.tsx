import React from 'react';

import MusicPreview from './musicPreview';
import SettingsPreview from './settingsPreview';
import { PREVIEW } from './Preview';

export const Previews = {
  [PREVIEW.MUSIC]: () => <MusicPreview />,
  [PREVIEW.SETTINGS]: () => <SettingsPreview />
};
