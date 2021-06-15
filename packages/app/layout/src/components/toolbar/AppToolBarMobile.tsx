import { AppBar } from '@material-ui/core';
import React, { FC } from 'react';

import { AppToolBarProps } from '.';
import { HideOnScroll } from './HideOnScroll';

export const AppToolBarMobile: FC<AppToolBarProps> = ({ children }) => {
  return (
    <HideOnScroll>
      <AppBar>{children}</AppBar>
    </HideOnScroll>
  );
};
