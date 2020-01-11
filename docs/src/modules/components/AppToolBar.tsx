import { createStyles, makeStyles, Theme, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React from 'react';

import { useTranslation } from '../../../../i18n';
import { ThemeActions } from '../redux/features/actionType';
import { RootState } from '../redux/reducers';
import { AppSearch } from './AppSearch';
import { LanguageMenu } from './LanguageMenu';

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
    // root: {
    //   display: 'flex',
    //   backgroundColor: theme.palette.background.level1,
    // },
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

  // const theme = useTheme();

  const {
    // dispatch,
    state: {
      navigation: { pages }
    }
  }: { dispatch: React.Dispatch<ThemeActions>; state: RootState } = useHoux();

  // const handleTogglePaletteType = () => {
  //   const paletteType: PaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
  //   dispatch(changeTheme({ paletteType }));
  // };

  return (
    <Toolbar>
      {pages && pages.length > 0 ? (
        <IconButton
          color='inherit'
          aria-label={t('openDrawer')}
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(drawerClasses.menuButton, {
            [drawerClasses.hide]: isDrawerOpen
          })}
        >
          <MenuIcon />
        </IconButton>
      ) : null}
      <Typography
        variant='h6'
        // color="inherit"
        noWrap
      >
        {t('application-title')}
      </Typography>

      <div className={customStyles.grow} />

      <AppSearch />
      <LanguageMenu />

      {/* <Tooltip title={t('toggleTheme')} enterDelay={300}>
        <IconButton
          color='inherit'
          onClick={handleTogglePaletteType}
          aria-label={t('toggleTheme')}
          data-ga-event-category='AppBar'
          data-ga-event-action='dark'
        >
          {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip> */}

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
          <GithubIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default AppToolBar;
