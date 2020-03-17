import { Divider } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import { useTranslation } from '../../../../i18n';
import { RootState } from '../redux/reducers';
import { pathnameToLanguage } from '../utils/helpers';
import Link from './common/link/Link';
import { Tree } from './tree/Tree';

const drawerWidth = 240;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
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
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
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
    },
    drawerPaper: {
      width: drawerWidth
    }
  })
);

export interface DrawerStyleOverride {
  drawer: string;
}

interface AppDrawerProps {
  isDrawerOpen: boolean;
  handleDrawerClose: () => void;
  drawerStyleOverride: DrawerStyleOverride;
}

const AppDrawer = (props: AppDrawerProps) => {
  const { isDrawerOpen, handleDrawerClose, drawerStyleOverride } = props;

  const classes = useDrawerStyles(
    drawerStyleOverride ? drawerStyleOverride.drawer : {}
  );

  const theme: Theme = useTheme();

  const {
    state: {
      navigation: { pages, activePage }
    }
  }: { state: RootState } = useHoux();

  const { t } = useTranslation();

  const canonicalRef = React.useRef();
  React.useEffect(() => {
    const { canonical } = pathnameToLanguage(window.location.pathname);
    (canonicalRef as any).current = canonical;
  }, []);

  const renderMobileDrawer = () => {
    return (
      <Drawer
        variant='temporary'
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Tree data={pages} activePage={activePage} />
      </Drawer>
    );
  };

  const renderDesktopDrawer = () => {
    return (
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen
          })
        }}
        open={isDrawerOpen}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Tree data={pages} activePage={activePage} />
      </Drawer>
    );
  };

  if (pages && pages.length > 0) {
    if (isMobileOnly) {
      return renderMobileDrawer();
    }
    return renderDesktopDrawer();
  }
  return null;
};

export default AppDrawer;
