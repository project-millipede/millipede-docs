import React from 'react';

import { AlbumsView, ArtistsView, ViewOptions } from '..';
import { SelectableList, SelectableListOption } from '../../../components';
import { useMenuHideWindow, useScrollHandler } from '../../../hooks';
import { PREVIEW } from '../../previews';

const MusicView = () => {
  useMenuHideWindow(ViewOptions.music.id);
  const options: Array<SelectableListOption> = [
    {
      label: 'Artists',
      value: () => <ArtistsView />,
      viewId: ViewOptions.artists.id,
      preview: PREVIEW.MUSIC
    },
    {
      label: 'Albums',
      value: () => <AlbumsView />,
      viewId: ViewOptions.albums.id,
      preview: PREVIEW.MUSIC
    }
  ];
  const [index] = useScrollHandler(ViewOptions.music.id, options);

  return <SelectableList options={options} activeIndex={index} />;
};

export default MusicView;
