import { ClassOutlined } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
      sx={{ margin: theme.spacing(2, 0.5) }}
    />
  );
};
