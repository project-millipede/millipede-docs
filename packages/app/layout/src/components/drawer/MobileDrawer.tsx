import { Link } from '@app/components';
import { createStyles, Divider, IconButton, makeStyles, SwipeableDrawer, Theme, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
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
      [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: `${drawerWidth}px`
      },
      whiteSpace: 'nowrap'
    },

    // drawer: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    //   whiteSpace: 'nowrap'
    // },

    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // at original
      // padding: theme.spacing(0, 1),
      padding: '0 8px'
      //   ...theme.mixins.toolbar
    },
    toolbarTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 8px'
      //   ...theme.mixins.toolbar
    },
    paper: {
      width: drawerWidth
    }
  })
);

interface MobileDrawerProps {
  isDrawerExpanded: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

export const MobileDrawer: FC<MobileDrawerProps> = ({
  isDrawerExpanded,
  handleDrawerOpen,
  handleDrawerClose
}) => {
  const classes = useDrawerStyles();

  const { t } = useTranslation();

  const { asPath } = useRouter();

  const navigation = useRecoilValue(navigationState);

  const { pages, activePage, flattenedPages } = navigation;

  return pages && pages.length > 0 ? (
    <SwipeableDrawer
      variant='temporary'
      classes={{
        paper: classes.paper
      }}
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
    </SwipeableDrawer>
  ) : null;
};
