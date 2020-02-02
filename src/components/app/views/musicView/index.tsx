import React from 'react';

import AlbumsView from '../albumsView';
import ArtistsView from '../artistsView';

import { ViewOptions } from '../ViewOptions';

import { SelectableList } from '../../../components/selectableList';
import { useMenuHideWindow, useScrollHandler } from '../../../hooks';

import { SelectableListOption } from '../../../components/selectableList/SelectableListOption';
import { PREVIEW } from '../../previews/Preview';

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
