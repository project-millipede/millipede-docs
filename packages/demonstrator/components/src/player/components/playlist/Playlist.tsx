import { getTopics } from '@demonstrators-social/flow';
import { PlayListItem } from '@demonstrators-social/shared/src/recoil/features/player/playlist/reducer';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import FolderIcon from '@material-ui/icons/Folder';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import get from 'lodash/get';
import { FC } from 'react';

interface PlaylistProps {
  playlist: Array<PlayListItem>;
  topic: string;
  onTopicChange: (topic: string) => void;
}

export const Playlist: FC<PlaylistProps> = ({
  playlist,
  topic,
  onTopicChange
}) => {
  const handlePlay = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const topic = event.currentTarget.value;
    onTopicChange(topic);
  };

  return (
    <List dense>
      {playlist.map(value => {
        const topicDescriptor = get(getTopics(), value.id);
        return (
          <ListItem key={value.id}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={topicDescriptor.title}
              secondary={topicDescriptor.subTitle}
            />
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
