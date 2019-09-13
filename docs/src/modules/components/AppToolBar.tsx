import { createStyles, makeStyles, Theme, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';

import { useTranslation } from '../../../../i18n';
import AppSearch from './AppSearch';
import MenuLanguage from './MenuLanguage';

interface AppToolBarProps {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
}

const useDrawerStyles = makeStyles((_theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    }
  })
);

const useCustomStyles = makeStyles((_theme: Theme) =>
  createStyles({
    // grow: {
    //   flexGrow: 1
    // },
    grow: {
      flex: '1 1 auto'
    }
  })
);

const AppToolBar = ({ isDrawerOpen, handleDrawerOpen }: AppToolBarProps) => {
  const drawerClasses = useDrawerStyles({});
  const customStyles = useCustomStyles({});

  const { t } = useTranslation();

  return (
    <Toolbar>
      <IconButton
        color='inherit'
        aria-label='Open drawer'
        onClick={handleDrawerOpen}
        edge='start'
        className={clsx(drawerClasses.menuButton, {
          [drawerClasses.hide]: isDrawerOpen
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant='h6'
        // color="inherit"
        noWrap
      >
        {t('application-title')}
      </Typography>

      <div className={customStyles.grow} />

      <AppSearch />

      <MenuLanguage />

      <Tooltip
        // title={t('github')}
        title={'Github'}
        enterDelay={300}
      >
        <IconButton
          edge='end'
          component='a'
          color='inherit'
          href='https://github.com/gurkerl83/millipede-docs'
          // aria-label={t('github')}
          aria-label={'github'}
          data-ga-event-category='AppBar'
          data-ga-event-action='github'
        >
          <GithubIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default AppToolBar;
