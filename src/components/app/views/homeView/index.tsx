// import ViewOptions, { CoverFlowView, MusicView, NowPlayingView, SettingsView } from 'App/views';
import React from 'react';

import TimelineView from '../timelineView';

// import { SelectableList, SelectableListOption } from '../../../components';
// import { useScrollHandler } from '../../../hooks';
// import { useAudioService } from '../../../services/audio';
// import { PREVIEW } from '../../previews';

// const strings = {
//   nowPlaying: 'Now Playing'
// };

const HomeView = () => {
  // const initialOptions: Array<SelectableListOption> = [
  //   // {
  //   //   label: 'Cover Flow',
  //   //   value: () => <CoverFlowView />,
  //   //   viewId: ViewOptions.coverFlow.id,
  //   //   preview: PREVIEW.MUSIC
  //   // },
  //   // Setup view

  //   {
  //     label: 'Music ---',
  //     // value: () => <MusicView />,
  //     value: () => <TimelineView />,
  //     viewId: ViewOptions.music.id,
  //     preview: PREVIEW.MUSIC
  //   }

  //   // {
  //   //   label: 'Settings',
  //   //   value: () => <SettingsView />,
  //   //   viewId: ViewOptions.settings.id,
  //   //   preview: PREVIEW.SETTINGS
  //   // }
  // ];

  // const [options, setOptions] = useState(initialOptions);
  // const { source } = useAudioService();
  // const [index] = useScrollHandler(ViewOptions.home.id, options);

  /** Append the "Now Playing" button to the list of options. */
  // const showNowPlaying = useCallback(() => {
  //   if (
  //     source &&
  //     !options.find(option => option.label === strings.nowPlaying)
  //   ) {
  //     setOptions([
  //       ...options
  //       // {
  //       // label: strings.nowPlaying,
  //       // value: () => <NowPlayingView />,
  //       // viewId: ViewOptions.nowPlaying.id,
  //       // preview: PREVIEW.MUSIC
  //       // }
  //     ]);
  //   }
  // }, [options, source]);

  /** Remove the "Now Playing" button from the list of options. */
  // const hideNowPlaying = useCallback(() => {
  //   if (options.find(option => option.label === strings.nowPlaying)) {
  //     setOptions(options.filter(option => option.label !== strings.nowPlaying));
  //   }
  // }, [options]);

  /** Conditionally show "Now Playing" button if music is queued/playing. */
  // useEffect(() => {
  //   if (source) {
  //     showNowPlaying();
  //   } else {
  //     hideNowPlaying();
  //   }
  // }, [hideNowPlaying, showNowPlaying, source]);

  // return <SelectableList options={options} activeIndex={index} />;
  return <TimelineView />;
};

export default HomeView;
