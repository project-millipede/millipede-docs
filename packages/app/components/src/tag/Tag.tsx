import { ClassOutlined } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

export const Anchor = styled('span')(({ theme }) => ({
  position: 'absolute',
  marginTop: theme.spacing(-10)
}));

interface TagProps {
  text: string;
  id: string;
}

export const Tag: FC<TagProps> = ({ text, id }) => {
  return (
    <div>
      <Anchor id={id} />
      <Chip
        variant='outlined'
        color='primary'
        icon={<ClassOutlined />}
        label={text}
      />
    </div>
  );
};
