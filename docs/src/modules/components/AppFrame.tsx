import { useHoux } from '@houx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { Dispatch, FC, ReactNode, useCallback, useState } from 'react';
import { PortalOut } from 'src/components/layout/grid/animation/framer/components/shared/portals/portals';
import { PortalType } from 'src/components/layout/grid/animation/framer/components/shared/portals/portals.constants';

import { ViewActions } from '../redux/features/actionType';
import { handleDrawer } from '../redux/features/view/actions';
import { RootState } from '../redux/reducers';
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

interface AppFrameProps {
  children: ReactNode;
}

export const AppFrame: FC<AppFrameProps> = ({ children }) => {
  const classes = useStyles();
  const drawerClasses = useDrawerStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    dispatch,
    state: {
      view: { isDrawerExpanded, isMobile }
    }
  }: {
    dispatch: Dispatch<ViewActions>;
    state: RootState;
  } = useHoux();

  const handleDrawerOpen = useCallback(() => {
    setMobileOpen(true);
    if (!isMobile) {
      dispatch(handleDrawer(true));
    }
  }, [dispatch, handleDrawer]);

  const handleDrawerClose = useCallback(() => {
    setMobileOpen(false);
    if (!isMobile) {
      dispatch(handleDrawer(false));
    }
  }, [dispatch, handleDrawer]);

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
        mobileOpen={mobileOpen}
        isDrawerExpanded={isDrawerExpanded}
      />

      <PortalOut portalType={PortalType.Cursor} />

      {children}
    </div>
  );
};
