import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

import AppDrawer, { DrawerStyleOverride } from './AppDrawer';
import AppToolBar from './AppToolBar';
import PageTitle from './PageTitle';

export const languages = [
  {
    code: 'en',
    text: '🇺🇸 English'
  },
  {
    code: 'de',
    text: '🇩🇪 Deutsch'
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    grow: {
      flex: '1 1 auto'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: '0 1 auto'
    },
    skipNav: {
      position: 'fixed',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.leavingScreen
      }),
      left: theme.spacing(2),
      top: theme.spacing(-10),
      zIndex: theme.zIndex.tooltip + 1,
      '&:focus': {
        top: theme.spacing(2),
        transition: theme.transitions.create('top', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      '@media print': {
        display: 'none'
      }
    },
    appBar: {
      transition: theme.transitions.create('width'),
      '@media print': {
        position: 'absolute'
      }
    },
    appBarHome: {
      boxShadow: 'none'
    },
    appBarShift: {
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - 240px)'
      }
    },
    navIconHide: {
      [theme.breakpoints.up('lg')]: {
        display: 'none'
      }
    },
    '@global': {
      '#main-content': {
        outline: 'none'
      }
    }
  })
);

const drawerWidth = 240;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
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
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

interface AppFrameProps extends React.Props<any> {
  drawerStyleOverride?: DrawerStyleOverride;
}

const AppFrame = ({ children, drawerStyleOverride }: AppFrameProps) => {
  const classes = useStyles({});
  const drawerClasses = useDrawerStyles({});

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <PageTitle>
      {title => {
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position='fixed'
              className={clsx(drawerClasses.appBar, {
                [drawerClasses.appBarShift]: open
              })}
            >
              <AppToolBar isDrawerOpen={open} handleDrawerOpen={handleDrawerOpen} />
            </AppBar>
            <AppDrawer
              drawerStyleOverride={drawerStyleOverride}
              isDrawerOpen={open}
              handleDrawerClose={handleDrawerClose}
            />
            {children}
          </div>
        );
      }}
    </PageTitle>
  );
};

export default AppFrame;
