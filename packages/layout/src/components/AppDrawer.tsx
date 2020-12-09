import { useHoux } from '@app/houx';
import {
  createStyles,
  Divider,
  Drawer,
  IconButton,
  Link,
  makeStyles,
  SwipeableDrawer,
  Theme,
  useTheme,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { RootState as LayoutState } from '../redux/features/reducers';
import { Tree } from './tree/Tree';

const drawerWidth = 280;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // at original
      // padding: theme.spacing(0, 1),
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    toolbarTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    paper: {
      width: drawerWidth
    }
  })
);

// disalbe iOS detection for now
// const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

interface AppDrawerProps {
  isDrawerExpanded: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

export const AppDrawer: FC<AppDrawerProps> = ({
  isDrawerExpanded,
  handleDrawerOpen,
  handleDrawerClose
}) => {
  const classes = useDrawerStyles();

  const theme: Theme = useTheme();

  const {
    state: { navigation: { pages, activePage }, view: { isMobile } } = {
      navigation: { pages: [], activePage: {} },
      view: {
        isMobile: false
      }
    } as any
  }: { state: LayoutState } = useHoux();

  const { t } = useTranslation();

  const renderMobileDrawer = () => {
    return (
      <SwipeableDrawer
        variant='temporary'
        classes={{
          paper: classes.paper
        }}
        // disableBackdropTransition={!iOS}
        open={isDrawerExpanded}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('common:application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <Tree data={pages} activePage={activePage} />
      </SwipeableDrawer>
    );
  };

  const renderDesktopDrawer = () => {
    return (
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isDrawerExpanded,
          [classes.drawerClose]: !isDrawerExpanded
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isDrawerExpanded,
            [classes.drawerClose]: !isDrawerExpanded
          })
        }}
        open={isDrawerExpanded}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('common:application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <Tree data={pages} activePage={activePage} />
      </Drawer>
    );
  };

  if (pages && pages.length > 0) {
    if (isMobile) {
      return renderMobileDrawer();
    }
    return renderDesktopDrawer();
  }
  return null;
};
