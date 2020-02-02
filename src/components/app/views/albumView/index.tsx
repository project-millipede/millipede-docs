import React, { useState } from 'react';

import { ViewOptions } from '..';
import { SelectableList, SelectableListOption } from '../../../components';
import { useMenuHideWindow, useScrollHandler } from '../../../hooks';

export interface Props {
  name: string;
}

const AlbumView = () => {
  useMenuHideWindow(ViewOptions.album.id);
  const [options] = useState<Array<SelectableListOption>>([]);
  const [index] = useScrollHandler(ViewOptions.album.id, options);

  //   const { loading, error, data } = useQuery<AlbumQuery>(ALBUM, {
  //     variables: { name }
  //   });

  //   useEffect(() => {
  //     if (data && data.album && !error) {
  //       setOptions(
  //         data.album.map((song, index) => ({
  //           label: song.name,
  //           value: () => <NowPlayingView />,
  //           viewId: ViewOptions.nowPlaying.id,
  //           songIndex: index,
  //           playlist: data.album
  //         }))
  //       );
  //     }
  //   }, [data, error]);

  const [loading] = useState(false);

  return (
    <SelectableList loading={loading} options={options} activeIndex={index} />
  );
};

export default AlbumView;
