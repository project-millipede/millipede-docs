import React from 'react'; // useState

import {
  // ViewOptions
  ElementsView
} from '..';
// import { SelectableList, SelectableListOption } from '../../../components';
// import { useScrollHandler } from '../../../hooks';
// import { PREVIEW } from '../../previews';

const HomeView = () => {
  // const initialOptions: Array<SelectableListOption> = [
  //   {
  //     label: 'Music',
  //     // value: () => <MusicView />,
  //     value: () => <ElementsView />,
  //     viewId: ViewOptions.music.id
  //     // preview: PREVIEW.MUSIC
  //   }
  // ];

  // const [options] = useState(initialOptions);
  // const [index] = useScrollHandler(ViewOptions.home.id, options);

  // return <SelectableList options={options} activeIndex={index} />;
  return <ElementsView />;
};

export default HomeView;
