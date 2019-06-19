import { InputBase } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { fade, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useHoux } from 'houx';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import React from 'react';

import { Page } from '../redux/features/navigation/type';
import { RootState } from '../redux/reducers';
import { pageToTitleI18n } from '../utils/helpers';
import AppDrawerNavItem from './AppDrawerNavItem';

interface AppDrawerProps {
  disablePermanent?: boolean;
  mobileOpen?: boolean;
  onClose?: (event: React.SyntheticEvent) => void;
  onOpen?: (event: React.SyntheticEvent) => void;
  t?: (title: string) => string;
  className?: string;
}

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

const useAppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200
        }
      }
    }
  })
);

const useCustomStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    }
  })
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 240
    },
    title: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(0.5),
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
    toolbarIe11: {
      display: 'flex'
    },
    placeholder: {
      height: 29
    },
    toolbar: {
      ...theme.mixins.toolbar,
      paddingLeft: theme.spacing(3),
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }
  })
);

interface Props extends WithRouterProps {}

interface ChildRoutes {
  items?: Array<JSX.Element>;
  page?: Page;
  activePage?: Page;
  depth?: number;
  translate?: (title: string, options: object) => string;
  props?: any;
}

function MiniDrawer(
  // {
  // router,
  // className,
  // disablePermanent,
  // mobileOpen,
  // onClose,
  // onOpen,
  // t
  // }
  props: AppDrawerProps
) {
  const drawerClasses = useDrawerStyles();
  const appBarClasses = useAppBarStyles();
  const customStyles = useCustomStyles();

  const classes = useStyles();

  const theme: Theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { state }: { state: RootState } = useHoux();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  // const drawer = (
  //   <div
  //   // className={classes.nav}
  //   >
  //     <div className={classes.placeholder} />
  //     <div className={classes.toolbarIe11}>
  //       <div className={classes.toolbar} />
  //     </div>
  //     <Divider />
  //     {renderNavItems({
  //       props,
  //       pages: state.navigation.pages,
  //       activePage: state.navigation.activePage,
  //       depth: 0
  //       // t
  //     })}
  //   </div>
  // );

  const drawer = renderNavItems({
    props,
    pages: state.navigation.pages,
    activePage: state.navigation.activePage,
    depth: 0
    // t
  });

  return (
    <div className={drawerClasses.root}>
      {/* <CssBaseline /> */}
      <AppBar
        position='fixed'
        className={clsx(drawerClasses.appBar, {
          [drawerClasses.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(drawerClasses.menuButton, {
              [drawerClasses.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            // color="inherit"
            noWrap
          >
            Project Millipede
          </Typography>

          <div className={customStyles.grow} />

          <div className={appBarClasses.search}>
            <div className={appBarClasses.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: appBarClasses.inputRoot,
                input: appBarClasses.inputInput
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(drawerClasses.drawer, {
          [drawerClasses.drawerOpen]: open,
          [drawerClasses.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [drawerClasses.drawerOpen]: open,
            [drawerClasses.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={drawerClasses.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        {drawer}
      </Drawer>
    </div>
  );
}

export default MiniDrawer;
