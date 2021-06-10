import { Link } from '@app/components';
import { MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH, TOOLBAR_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { Divider, Drawer, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { DrawerProps } from '.';

const useDrawerStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: MAX_DRAWER_WIDTH,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    overflowX: 'hidden',
    width: MAX_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    overflowX: 'hidden',
    width: MIN_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: TOOLBAR_HEIGHT
  }
}));

export const DesktopDrawer: FC<DrawerProps> = ({
  isDrawerExpanded,
  handleDrawerClose,
  children
}) => {
  const classes = useDrawerStyles();

  const { t } = useTranslation();

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isDrawerExpanded,
        [classes.drawerClose]: !isDrawerExpanded
      })}
      classes={{
        paper: isDrawerExpanded ? classes.drawerOpen : classes.drawerClose
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
          <Typography variant='h6'>{t('common:application-title')}</Typography>
        </Link>

        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      {children}
    </Drawer>
  );
};
