import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import { ViewActions } from '../redux/features/actionType';
import { handleDrawer } from '../redux/features/view/actions';
import { RootState } from '../redux/reducers';
import AppDrawer, { DrawerStyleOverride } from './AppDrawer';
import AppToolBar from './AppToolBar';

// import usePageTitle from './usePageTitle';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

const drawerClosedWidth = 73;
const drawerOpenedWidth = 240;

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
    },
    contentDrawerClosed: {
      display: 'contents',
      width: isMobileOnly ? '100%' : `calc(100% - ${drawerClosedWidth}px)`
    },
    contentDrawerOpened: {
      display: 'contents',
      width: isMobileOnly ? '100%' : `calc(100% - ${drawerOpenedWidth}px)`
    }
  })
);

interface AppFrameProps extends React.Props<any> {
  drawerStyleOverride?: DrawerStyleOverride;
}

const AppFrame = ({ children, drawerStyleOverride }: AppFrameProps) => {
  const classes = useStyles({});
  const drawerClasses = useDrawerStyles({});

  // const [open, setOpen] = useState(false);

  const {
    dispatch,
    state: {
      view: { isOpen }
    }
  }: {
    dispatch: React.Dispatch<ViewActions>;
    state: RootState;
  } = useHoux();

  const handleDrawerOpen = () => {
    dispatch(handleDrawer(true));
    // setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch(handleDrawer(false));
    // setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(drawerClasses.appBar, {
          [drawerClasses.appBarShift]: isOpen
        })}
      >
        <AppToolBar isDrawerOpen={isOpen} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <AppDrawer
        drawerStyleOverride={drawerStyleOverride}
        isDrawerOpen={isOpen}
        handleDrawerClose={handleDrawerClose}
      />
      {/* <div
        className={
          isOpen
            ? drawerClasses.contentDrawerOpened
            : drawerClasses.contentDrawerClosed
        }
      > */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default AppFrame;
