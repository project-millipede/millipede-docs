import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: theme.spacing(5),
  backgroundColor: '#CCEECC'
}));

export const SheetHeader: FC = ({ children }) => {
  return <Header>{children}</Header>;
};
