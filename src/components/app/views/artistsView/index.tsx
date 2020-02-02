import React, { useState } from 'react';

import { ViewOptions } from '..';
import { SelectableList, SelectableListOption } from '../../../components';
import { useMenuHideWindow, useScrollHandler } from '../../../hooks';

export type ArtistsQuery = {
  artists: [
    {
      artist: string;
    }
  ];
};

// const ARTISTS = gql`
//   {
//     artists {
//       artist
//     }
//   }
// `;

const ArtistsView = () => {
  useMenuHideWindow(ViewOptions.artists.id);
  //   const { loading, error, data } = useQuery<ArtistsQuery>(ARTISTS);
  const [options] = useState<Array<SelectableListOption>>([]);

  //   useEffect(() => {
  //     if (data && data.artists && !error) {
  //       setOptions(
  //         data.artists.map(result => ({
  //           label: result.artist,
  //           viewId: ViewOptions.artist.id,
  //           value: () => <ArtistView name={result.artist} />
  //         }))
  //       );
  //     }
  //   }, [data, error]);

  const [index] = useScrollHandler(ViewOptions.artists.id, options);

  const [loading] = useState(false);

  return (
    <SelectableList loading={loading} options={options} activeIndex={index} />
  );
};

export default ArtistsView;
