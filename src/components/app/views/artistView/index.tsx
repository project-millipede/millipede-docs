import React, { useState } from 'react';

import { ViewOptions } from '../ViewOptions';
import { SelectableList } from '../../../components/selectableList';
import { useMenuHideWindow, useScrollHandler } from '../../../hooks';
import { SelectableListOption } from '../../../components/selectableList/SelectableListOption';

export interface Props {
  name: string;
}

const ArtistView = () => {
  useMenuHideWindow(ViewOptions.artist.id);

  const [options] = useState<Array<SelectableListOption>>([]);
  const [index] = useScrollHandler(ViewOptions.artist.id, options);

  //   const { loading, error, data } = useQuery<ArtistQuery>(ARTIST, {
  //     variables: { name }
  //   });

  //   useEffect(() => {
  //     if (data && data.artist && !error) {
  //       setOptions(
  //         data.artist.map(result => ({
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

export default ArtistView;
