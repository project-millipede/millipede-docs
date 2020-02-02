/* eslint-disable import/no-cycle */
export { default as AboutView } from './aboutView';
// export { default as CoverFlowView } from './CoverFlowView';
export { default as HomeView } from './homeView';
export { default as MusicView } from './musicView';
export { default as ArtistsView } from './artistsView';
export { default as ArtistView } from './artistView';
export { default as ElementsView } from './elementsView';
export { default as TimelineView } from './timelineView';
export { default as AlbumsView } from './albumsView';
export { default as AlbumView } from './albumView';
// export { default as NowPlayingView } from './NowPlayingView';
// export { default as GamesView } from './GamesView';
// export { default as BrickGameView } from './BrickGameView';
export { default as SettingsView } from './settingsView';

export enum WINDOW_TYPE {
  SPLIT = 'SPLIT',
  FULL = 'FULL',
  COVER_FLOW = 'COVER_FLOW'
}

export type ViewOption = {
  id: string;
  title: string;
  type: WINDOW_TYPE;
};

export const ViewOptions: Record<string, ViewOption> = {
  // Split Screen Views
  home: { id: 'home', title: 'home / split', type: WINDOW_TYPE.SPLIT },
  // home: { id: 'home', title: 'iPod.js', type: WINDOW_TYPE.FULL },

  // music: { id: 'music', title: 'Music', type: WINDOW_TYPE.SPLIT },
  music: { id: 'music', title: 'Music', type: WINDOW_TYPE.FULL },

  games: { id: 'games', title: 'Games', type: WINDOW_TYPE.SPLIT },
  // settings: { id: 'settings', title: 'Settings', type: WINDOW_TYPE.SPLIT },
  settings: { id: 'settings', title: 'Settings', type: WINDOW_TYPE.FULL },

  // Fullscreen Views
  about: { id: 'about', title: 'About', type: WINDOW_TYPE.FULL },
  artists: { id: 'artists', title: 'Artists', type: WINDOW_TYPE.FULL },
  artist: { id: 'artist', title: 'Artist', type: WINDOW_TYPE.FULL },
  albums: { id: 'albums', title: 'Albums', type: WINDOW_TYPE.FULL },
  album: { id: 'album', title: 'Album', type: WINDOW_TYPE.FULL },
  nowPlaying: {
    id: 'nowPlaying',
    title: 'Now Playing',
    type: WINDOW_TYPE.FULL
  },
  brickGame: { id: 'brickGame', title: 'Brick', type: WINDOW_TYPE.FULL },

  // CoverFlow view
  coverFlow: {
    id: 'coverFlow',
    title: 'Cover Flow',
    type: WINDOW_TYPE.COVER_FLOW
  }
};

export default ViewOptions;
