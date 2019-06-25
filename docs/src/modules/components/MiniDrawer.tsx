import { Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React, { SyntheticEvent } from 'react';

import { Page } from '../redux/features/navigation/type';
import { RootState } from '../redux/reducers';
import { pageToTitleI18n, pathnameToLanguage } from '../utils/helpers';
import AppDrawerNavItem from './AppDrawerNavItem';
import AppSearch from './AppSearch';
import MenuLanguage from './MenuLanguage';

interface AppDrawerProps {
  disablePermanent?: boolean;
  mobileOpen?: boolean;
  onClose?: (event: SyntheticEvent) => void;
  onOpen?: (event: SyntheticEvent) => void;
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

const useCustomStyles = makeStyles((theme: Theme) =>
  createStyles({
    // grow: {
    //   flexGrow: 1
    // },
    grow: {
      flex: '1 1 auto'
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
  const drawerClasses = useDrawerStyles({});
  const customStyles = useCustomStyles({});

  const classes = useStyles({});

  const theme: Theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { state }: { state: RootState } = useHoux();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
