import FolderIcon from '@mui/icons-material/Folder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { green } from '@mui/material/colors';
import { FC } from 'react';
import { useRecoilState } from 'recoil';

import { playerLayoutState } from '../../context/reducer';
import { PlayListItem } from '../../types';

interface PlaylistProps {
  playlist: Array<PlayListItem>;
}

export const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  const [{ topic }, setPlayerLayoutState] = useRecoilState(playerLayoutState);

  const handlePlay = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setPlayerLayoutState(state => {
      return {
        ...state,
        topic: event.currentTarget.value
      };
    });
  };

  return (
    <List dense>
      {playlist.map(value => {
        return (
          <ListItem key={value.id}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={value.title} secondary={value.description} />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='play'
                value={value.id}
                onClick={handlePlay}
              >
                <PlayCircleOutlineIcon
                  style={{
                    color: topic === value.id && green[500]
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
