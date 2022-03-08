import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TopicIcon from '@mui/icons-material/Topic';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { features } from '../../features';
import { Story } from '../../features/layout/states';
import { PlayListItem } from '../../types';

interface PlaylistProps {
  playlist: Array<PlayListItem>;
}

export const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  const {
    layout: {
      states: { playerLayoutState },
      selector: { storySelector }
    }
  } = features;

  const { topic } = useRecoilValue(playerLayoutState);

  const handleCreate = useRecoilCallback(
    ({ set }) =>
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const topic = event.currentTarget.value;

        const story: Story = {
          steps: []
        };

        set(storySelector(topic), story);

        set(playerLayoutState, state => {
          return {
            ...state,
            topic
          };
        });
      },
    []
  );

  return (
    <List dense>
      {playlist.map(playlistItem => {
        return (
          <ListItem key={playlistItem.id}>
            <ListItemAvatar>
              <Avatar>
                <TopicIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={playlistItem.title}
              secondary={playlistItem.description}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='play'
                value={playlistItem.id}
                onClick={handleCreate}
              >
                <PlayCircleOutlineIcon
                  style={{
                    color: topic === playlistItem.id && green[500]
                  }}
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
