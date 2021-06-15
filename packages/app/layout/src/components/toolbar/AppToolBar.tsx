import { AppBar, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { FC } from 'react';

import { AppToolBarProps } from '.';
import { MAX_DRAWER_WIDTH } from '../../recoil/features/layout/reducer';

const useDrawerStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${MAX_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

export const AppToolBar: FC<AppToolBarProps> = ({
  isDrawerExpanded,
  children
}) => {
  const drawerClasses = useDrawerStyles();

  return (
    <AppBar
      position={'fixed'}
      className={clsx(drawerClasses.appBar, {
        [drawerClasses.appBarShift]: isDrawerExpanded
      })}
    >
      {children}
    </AppBar>
  );
};
