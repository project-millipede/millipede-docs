import { atom, atomFamily } from 'recoil';

import { PlayListItem, Step } from '../../types';

export interface Layout {
  isPlayerExpanded: boolean;
  topic: string;
  playlist: Array<PlayListItem>;
}

const playerLayoutInitialState: Layout = {
  isPlayerExpanded: false,
  topic: '',
  playlist: [
    {
      id: 'publish_content_unprotected',
      title: 'Veröffentlichung von Inhalten, ungeschützt',
      description: 'Übergabe der Inhalte an den Anbieter',
      steps: []
    },
    {
      id: 'publish_comment',
      title: 'Reaktion zu Inhalten',
      description: 'Anbieter messen jede Interaktion des Bedieners',
      steps: []
    }
  ]
};

export const playerLayoutState = atom({
  key: 'player-layout',
  default: playerLayoutInitialState
});

export interface Story {
  steps: Array<Step>;
}

const storyInitialState: Story = {
  steps: []
};

export const storyState = atomFamily<Story, string>({
  key: 'story',
  default: storyInitialState
});
