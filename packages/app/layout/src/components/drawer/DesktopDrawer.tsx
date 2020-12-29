import { Link } from '@app/components';
import { createStyles, Divider, Drawer, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { navigationState } from '../../recoil/features/pages/reducer';
import { Tree } from '../tree';

const drawerWidth = 280;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },

    // drawer: {
    //   [theme.breakpoints.up('lg')]: {
    //     flexShrink: 0,
    //     width: `${drawerWidth}px`
    //   },
    //   whiteSpace: 'nowrap'
    // },

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

  return pages && pages.length > 0 ? (
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
          <Typography variant='h6' className={classes.toolbarTitle}>
            {t('common:application-title')}
          </Typography>
        </Link>

        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <Tree
        pages={pages}
        flattenedPages={flattenedPages}
        pathname={asPath}
        activePage={activePage}
      />
    </Drawer>
  ) : null;
};
