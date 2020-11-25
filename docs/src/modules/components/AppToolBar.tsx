import { useHoux } from '@app/houx';
import { createStyles, IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { GitHub, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React, { Dispatch, FC } from 'react';

import { ThemeActions } from '../redux/features/actionType';
import { RootState } from '../redux/reducers';
import { AppSearch } from './AppSearch';
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

  const {
    state: {
      navigation: { pages }
    }
  }: { dispatch: Dispatch<ThemeActions>; state: RootState } = useHoux();

  return (
    <Toolbar>
      {pages && pages.length > 0 ? (
        <IconButton
          color='inherit'
          aria-label={t('common:openDrawer')}
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(drawerClasses.menuButton, {
            [drawerClasses.hide]: isDrawerExpanded
          })}
        >
          <Menu />
        </IconButton>
      ) : null}
      <Typography variant='h6' noWrap>
        {t('common:application-title')}
      </Typography>

      <div className={customStyles.grow} />

      <AppSearch />
      <LanguageMenu />

      <Tooltip title={t('common:github')} enterDelay={300}>
        <IconButton
          edge='end'
          component='a'
          color='inherit'
          href='https://github.com/project-millipede/millipede-docs'
          aria-label={t('common:github')}
          data-ga-event-category='AppBar'
          data-ga-event-action='github'
        >
          <GitHub />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
