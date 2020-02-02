import React, { useState } from 'react';

import { ViewOptions } from '..';
import { SelectableList, SelectableListOption } from '../../../components';
import { useMenuHideWindow, useScrollHandler } from '../../../hooks';

const AlbumsView = () => {
  useMenuHideWindow(ViewOptions.albums.id);
  const [options] = useState<Array<SelectableListOption>>([]);
  const [index] = useScrollHandler(ViewOptions.albums.id, options);

  //   const { loading, error, data } = useQuery<AlbumsQuery>(ALBUMS);

  //   useEffect(() => {
  //     if (data && data.albums && !error) {
  //       setOptions(
  //         data.albums.map(result => ({
  //           label: result.album,
  //           value: () => <AlbumView name={result.album} />,
  //           image: getUrlFromPath(result.artwork),
  //           viewId: ViewOptions.album.id
  //         }))
  //       );
  //     }
  //   }, [data, error]);

  const [loading] = useState(false);

  return (
    <SelectableList loading={loading} options={options} activeIndex={index} />
  );
};

export default AlbumsView;
