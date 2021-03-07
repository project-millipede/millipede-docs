import { Link } from '@app/components';
import { MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH, TOOLBAR_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { createStyles, Divider, Drawer, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { navigationState } from '../../recoil/features/pages/reducer';
import { Tree } from '../tree';

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface DesktopDrawerProps {
  isDrawerExpanded: boolean;
  handleDrawerClose: () => void;
}

export const DesktopDrawer: FC<DesktopDrawerProps> = ({
  isDrawerExpanded,
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

  return pages && pages.length > 0 ? (
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
      {treeComp}
    </Drawer>
  ) : null;
};
