import { Link } from '@app/components';
import {
  createStyles,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  SwipeableDrawer,
  Theme,
  Typography
} from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { useRecoilValue } from 'recoil';

import { navigationState } from '../recoil/features/pages/reducer';
import { Tree } from './tree';

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
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1)
    },
    paper: {
      width: drawerWidth
    }
  })
);
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

  const { t } = useTranslation();

  const { asPath } = useRouter();

  const navigation = useRecoilValue(navigationState);

  const { pages, activePage, flattenedPages } = navigation;

  const treeComp =
    activePage != null ? (
      <Tree
        pages={pages}
        flattenedPages={flattenedPages}
        pathname={asPath}
        activePage={activePage}
      />
    ) : null;

  const renderMobileDrawer = () => {
    return (
      <SwipeableDrawer
        variant='temporary'
        classes={{
          paper: classes.paper
        }}
        disableBackdropTransition={!isIOS}
        open={isDrawerExpanded}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className={classes.toolbar}>
          <Link
            href={
              {
                pathname: '/'
              } as any
            }
            onClick={handleDrawerClose}
          >
            <Typography variant='h6'>
              {t('common:application-title')}
            </Typography>
          </Link>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {treeComp}
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
            href={
              {
                pathname: '/'
              } as any
            }
            onClick={handleDrawerClose}
          >
            <Typography variant='h6'>
              {t('common:application-title')}
            </Typography>
          </Link>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {treeComp}
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
