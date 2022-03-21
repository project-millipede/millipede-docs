import { Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

export const h1: FC = ({ children }) => (
  <Typography variant='h1'>{children}</Typography>
);

export const h5: FC = ({ children }) => (
  <Typography variant='h5'>{children}</Typography>
);
export const h6: FC = ({ children }) => (
  <Typography variant='h6'>{children}</Typography>
);

export const blockquote = styled('blockquote')(({ theme }) => ({
  borderLeft: `${theme.spacing(0.5)} solid ${blue[500]}`,
  backgroundColor: 'rgb(33, 150, 243, 0.2)',
  margin: theme.spacing(3, 0),
  '& p': {
    margin: 0,
    padding: theme.spacing(2)
  }
}));
