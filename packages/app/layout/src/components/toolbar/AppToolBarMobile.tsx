import { AppBar } from '@material-ui/core';
import React, { FC } from 'react';

import { AppBarProps } from '.';
import { HideOnScroll } from './HideOnScroll';

export const AppToolBarMobile: FC<AppBarProps> = ({ children }) => {
  return (
    <HideOnScroll>
      <AppBar>{children}</AppBar>
    </HideOnScroll>
  );
};
