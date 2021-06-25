import { Chip } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ClassOutlined } from '@material-ui/icons';
import React, { FC } from 'react';

interface TagProps {
  text: string;
  id: string;
}

export const Tag: FC<TagProps> = ({ text, id }) => {
  const theme = useTheme();
  return (
    <Chip
      id={id}
      variant='outlined'
      color='primary'
      icon={<ClassOutlined />}
      label={text}
      sx={{ m: theme.spacing(2, 0) }}
    />
  );
};
