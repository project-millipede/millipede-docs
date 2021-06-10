import { Link } from '@app/components';
import { MAX_DRAWER_WIDTH, TOOLBAR_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { Divider, IconButton, makeStyles, SwipeableDrawer, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { DrawerProps } from '.';

const useDrawerStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: TOOLBAR_HEIGHT
  },
  paperMobile: {
    width: MAX_DRAWER_WIDTH
  }
}));

export const MobileDrawer: FC<DrawerProps> = ({
  isDrawerExpanded,
  handleDrawerOpen,
  handleDrawerClose,
  children
}) => {
  const classes = useDrawerStyles();

  const { t } = useTranslation();

  return (
    <SwipeableDrawer
      variant='temporary'
      classes={{
        paper: classes.paperMobile
      }}
      open={isDrawerExpanded}
      onOpen={handleDrawerOpen}
      onClose={handleDrawerClose}
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
          <Typography variant='h6'>{t('common:application-title')}</Typography>
        </Link>

        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>

      <Divider />

      {children}
    </SwipeableDrawer>
  );
};
