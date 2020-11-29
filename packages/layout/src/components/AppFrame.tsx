import { Portal } from '@app/components';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, useCallback, useState } from 'react';

import { AppDrawer } from './AppDrawer';
import { AppToolBar } from './AppToolBar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

const drawerOpenedWidth = 280;

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
      marginLeft: drawerOpenedWidth,
      width: `calc(100% - ${drawerOpenedWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
);

export const AppFrame: FC = ({ children }) => {
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
      <AppBar
        position='fixed'
        className={clsx(drawerClasses.appBar, {
          [drawerClasses.appBarShift]: isDrawerExpanded
        })}
      >
        <AppToolBar
          isDrawerExpanded={isDrawerExpanded}
          handleDrawerOpen={handleDrawerOpen}
        />
      </AppBar>

      <AppDrawer
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isDrawerExpanded={isDrawerExpanded}
      />

      <Portal.Portal.PortalOut
        portalType={Portal.PortalConstants.PortalType.Cursor}
      />

      {children}
    </div>
  );
};
