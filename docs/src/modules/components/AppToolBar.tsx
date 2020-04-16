import { createStyles, makeStyles, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React, { Dispatch } from 'react';

import { useTranslation } from '../../../../i18n';
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

const AppToolBar = ({
  isDrawerExpanded,
  handleDrawerOpen
}: AppToolBarProps) => {
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
          aria-label={t('openDrawer')}
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(drawerClasses.menuButton, {
            [drawerClasses.hide]: isDrawerExpanded
          })}
        >
          <MenuIcon />
        </IconButton>
      ) : null}
      <Typography variant='h6' noWrap>
        {t('application-title')}
      </Typography>

      <div className={customStyles.grow} />

      <AppSearch />
      <LanguageMenu />

      <Tooltip title={t('github')} enterDelay={300}>
        <IconButton
          edge='end'
          component='a'
          color='inherit'
          href='https://github.com/project-millipede/millipede-docs'
          aria-label={t('github')}
          data-ga-event-category='AppBar'
          data-ga-event-action='github'
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default AppToolBar;
