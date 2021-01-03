import {
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip
} from '@material-ui/core';
import { GitHub, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { LanguageMenu } from './LanguageMenu';

interface AppToolBarProps {
  isDrawerExpanded: boolean;
  handleDrawerOpen: () => void;
}

const useDrawerStyles = makeStyles(() =>
  createStyles({
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    }
  })
);

const useCustomStyles = makeStyles(() =>
  createStyles({
    grow: {
      flex: '1 1 auto'
    }
  })
);

export const AppToolBar: FC<AppToolBarProps> = ({
  isDrawerExpanded,
  handleDrawerOpen
}) => {
  const drawerClasses = useDrawerStyles();
  const customStyles = useCustomStyles();

  const { t } = useTranslation();

  return (
    <Toolbar>
      <IconButton
        edge='start'
        color='inherit'
        onClick={handleDrawerOpen}
        className={clsx(drawerClasses.menuButton, {
          [drawerClasses.hide]: isDrawerExpanded
        })}
      >
        <Menu />
      </IconButton>

      <div className={customStyles.grow} />

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
};
