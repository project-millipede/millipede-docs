import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Tooltip } from '@material-ui/core';
import { GitHub, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { AppToolBarProps } from '.';
import { MAX_DRAWER_WIDTH, TOOLBAR_HEIGHT } from '../../recoil/features/layout/reducer';
import { LanguageMenu } from './LanguageMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      minHeight: TOOLBAR_HEIGHT,
      padding: theme.spacing(0, 3)
    },
    grow: {
      flex: '1 1 auto'
    },
    hide: {
      display: 'none'
    }
  })
);

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
      width: `calc(100% - ${MAX_DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  })
);

export const AppToolBar: FC<AppToolBarProps> = ({
  isDrawerExpanded,
  handleDrawerOpen
}) => {
  const classes = useStyles();

  const drawerClasses = useDrawerStyles();

  const { t } = useTranslation();

  return (
    <AppBar
      position={'fixed'}
      className={clsx(drawerClasses.appBar, {
        [drawerClasses.appBarShift]: isDrawerExpanded
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          onClick={handleDrawerOpen}
          className={clsx({
            [classes.hide]: isDrawerExpanded
          })}
        >
          <Menu />
        </IconButton>

        <div className={classes.grow} />

        <LanguageMenu />

        <Tooltip title={t('common:github')} enterDelay={300}>
          <IconButton
            edge='end'
            component='a'
            color='inherit'
            href='https://github.com/project-millipede/millipede-docs'
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
