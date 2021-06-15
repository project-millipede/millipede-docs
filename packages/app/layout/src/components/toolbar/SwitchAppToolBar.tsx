import { Components } from '@app/render-utils';
import { IconButton, makeStyles, Theme, Toolbar, Tooltip } from '@material-ui/core';
import { GitHub, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { AppToolBarProps } from '.';
import { TOOLBAR_HEIGHT } from '../../recoil/features/layout/reducer';
import { AppToolBar } from './AppToolBar';
import { AppToolBarMobile } from './AppToolBarMobile';
import { LanguageMenu } from './LanguageMenu';

const {
  Responsive: { Mobile, Desktop }
} = Components;

export const useStyles = makeStyles((theme: Theme) => ({
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
}));

export const SwitchAppToolBar: FC<AppToolBarProps> = ({
  isDrawerExpanded,
  handleDrawerOpen
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const toolBar = (
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
  );
  return (
    <>
      <Mobile>
        <AppToolBarMobile>{toolBar}</AppToolBarMobile>
      </Mobile>
      <Desktop>
        <AppToolBar isDrawerExpanded={isDrawerExpanded}>{toolBar}</AppToolBar>
      </Desktop>
    </>
  );
};
