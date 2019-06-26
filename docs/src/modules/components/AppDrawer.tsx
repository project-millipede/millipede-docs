import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { Theme, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React, { SyntheticEvent } from 'react';

import { Page } from '../redux/features/navigation/type';
import { RootState } from '../redux/reducers';
import { pageToTitleI18n, pathnameToLanguage } from '../utils/helpers';
import AppDrawerNavItem from './AppDrawerNavItem';

const drawerWidth = 240;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
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
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
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

interface ChildRoutes {
  items?: Array<JSX.Element>;
  page?: Page;
  activePage?: Page;
  depth?: number;
  translate?: (title: string, options: object) => string;
  props?: any;
}

const AppDrawer = (props: AppDrawerProps) => {
  const { isDrawerOpen, handleDrawerClose, drawerStyleOverride } = props;

  const classes = useDrawerStyles(drawerStyleOverride ? drawerStyleOverride.drawer : {});

  const theme: Theme = useTheme();

  const { state }: { state: RootState } = useHoux();

  const canonicalRef = React.useRef();
  React.useEffect(() => {
    const { canonical } = pathnameToLanguage(window.location.pathname);
    (canonicalRef as any).current = canonical;
  }, []);

  const reduceChildRoutes = ({ items, page, activePage, depth, translate, props }: ChildRoutes) => {
    if (page.displayNav === false) {
      return items;
    }

    if (page.children && page.children.length > 1) {
      const title = pageToTitleI18n(page, undefined);
      const topLevel = activePage.pathname.indexOf(`${page.pathname}/`) === 0;

      items.push(
        <AppDrawerNavItem
          depth={depth}
          key={title}
          topLevel={topLevel && !page.subheader}
          openImmediately={topLevel || Boolean(page.subheader)}
          title={title}
          icon={page.icon}
        >
          {renderNavItems({ props, pages: page.children, activePage, depth: depth + 1, undefined })}
        </AppDrawerNavItem>
      );
    } else {
      const title = pageToTitleI18n(page, undefined);
      page = page.children && page.children.length === 1 ? page.children[0] : page;
      items.push(
        <AppDrawerNavItem
          depth={depth}
          key={title}
          title={title}
          icon={page.icon}
          href={page.pathname}
          onClick={props.onClose}
        />
      );
    }
    return items;
  };

  const renderNavItems = ({ pages, ...params }) => {
    return (
      <List dense>
        {pages.reduce((items, page) => reduceChildRoutes({ items, page, ...params }), [])}
      </List>
    );
  };

  const drawer = renderNavItems({
    props,
    pages: state.navigation.pages,
    activePage: state.navigation.activePage,
    depth: 0,
    isDrawerOpen
  });

  return (
    <div className={classes.root}>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        {drawer}
      </Drawer>
    </div>
  );
};

export default AppDrawer;
