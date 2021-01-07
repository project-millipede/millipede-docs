import { Portal } from '@app/components';
import { AppBar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, useCallback, useState } from 'react';

import { AppDrawer } from './AppDrawer';
import { AppToolBar } from './AppToolBar';
import { HideOnScroll } from './HideOnScroll';

// Warning - dynamic imports seem to destroy css server

// import dynamic from 'next/dynamic';
// import { AppDrawerProxy } from './AppDrawerProxy';
// const AppDrawer = dynamic(() =>
//   import('./AppDrawer').then(module => module.AppDrawer)
// );

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

export const drawerWidth = 280;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
);

interface AppFrameProps {
  isMobile: boolean;
}

export const AppFrame: FC<AppFrameProps> = ({ children, isMobile }) => {
  const classes = useStyles();
  const drawerClasses = useDrawerStyles();

  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setIsDrawerExpanded(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerExpanded(false);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      {isMobile ? (
        <HideOnScroll>
          <AppBar>
            <AppToolBar
              isDrawerExpanded={isDrawerExpanded}
              handleDrawerOpen={handleDrawerOpen}
            />
          </AppBar>
        </HideOnScroll>
      ) : (
        <AppBar
          position={'fixed'}
          className={clsx(drawerClasses.appBar, {
            [drawerClasses.appBarShift]: isDrawerExpanded
          })}
        >
          <AppToolBar
            isDrawerExpanded={isDrawerExpanded}
            handleDrawerOpen={handleDrawerOpen}
          />
        </AppBar>
      )}

      <AppDrawer
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isDrawerExpanded={isDrawerExpanded}
      />

      <Portal.PortalOut portalType={Portal.PortalType.Cursor} />

      {children}
    </div>
  );
};
