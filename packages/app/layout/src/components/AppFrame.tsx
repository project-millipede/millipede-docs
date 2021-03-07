import { Portal } from '@app/components';
import { layoutState, MAX_DRAWER_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { AppBar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { AppDrawer } from './AppDrawer';
import { AppToolBar } from './AppToolBar';
import { HideOnScroll } from './HideOnScroll';

// import dynamic from 'next/dynamic';
// Warning - dynamic imports seem to destroy css server

// import { AppDrawerProxy } from './AppDrawerProxy';
// const AppDrawer = dynamic(() =>
//   import('./AppDrawerProxy').then(module => module.AppDrawerProxy)
// );

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

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
      width: `calc(100% - ${MAX_DRAWER_WIDTH}px)`,
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

  const [{ isDrawerExpanded }, setLayout] = useRecoilState(layoutState);

  const handleDrawerOpen = useCallback(() => {
    setLayout(state => {
      return {
        ...state,
        isDrawerExpanded: true
      };
    });
  }, []);

  const handleDrawerClose = useCallback(() => {
    setLayout(state => {
      return {
        ...state,
        isDrawerExpanded: false
      };
    });
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
