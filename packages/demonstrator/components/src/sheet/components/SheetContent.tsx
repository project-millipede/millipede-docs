import { styled } from '@material-ui/core/styles';
import React, { FC } from 'react';

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(3)
}));

export const SheetContent: FC = ({ children }) => {
  return <Content>{children}</Content>;
};
