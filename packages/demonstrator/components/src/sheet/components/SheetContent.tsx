import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(3)
}));

export const SheetContent: FC = ({ children }) => {
  return <Content>{children}</Content>;
};
