import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, useState } from 'react';

import MiniDrawer from './MiniDrawer';
import PageTitle from './PageTitle';

// import NProgressBar from '@material-ui/docs/NProgressBar';

export const languages = [
  {
    code: "en",
    text: "🇺🇸 English"
  },
  {
    code: "de",
    text: "🇩🇪 Deutsch"
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    grow: {
      flex: "1 1 auto"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: "0 1 auto"
    },
    skipNav: {
      position: "fixed",
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create("top", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.leavingScreen
      }),
      left: theme.spacing(2),
      top: theme.spacing(-10),
      zIndex: theme.zIndex.tooltip + 1,
      "&:focus": {
        top: theme.spacing(2),
        transition: theme.transitions.create("top", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      "@media print": {
        display: "none"
      }
    },
    appBar: {
      transition: theme.transitions.create("width"),
      "@media print": {
        position: "absolute"
      }
    },
    appBarHome: {
      boxShadow: "none"
    },
    appBarShift: {
      [theme.breakpoints.up("lg")]: {
        width: "calc(100% - 240px)"
      }
    },
    navIconHide: {
      [theme.breakpoints.up("lg")]: {
        display: "none"
      }
    },
    "@global": {
      "#main-content": {
        outline: "none"
      }
    }
  })
);

interface OProps extends React.Props<any> {}
type Props = OProps;

const AppFrame = ({ children }: Props) => {
  const classes = useStyles();

  const [languageMenu, setLanguageMenu] = useState(null);
  const [open, setOpen] = useState(false);

  // const {
  //   state,
  //   dispatch
  // }: { state: RootState; dispatch: React.Dispatch<ThemeActions> } = useHoux();

  let canonical = null;

  // componentDidMount() {
  //   const { canonical } = pathnameToLanguage(window.location.pathname);
  //   this.canonical = canonical;
  // }

  // useEffect(() => {
  //   const { canonical: canonicalTemp } = pathnameToLanguage(window.location.pathname);
  //   canonical = canonicalTemp;
  //   return () => {
  //     canonical = null;
  //   };
  // });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <PageTitle
    // t={state.option.t}
    >
      {title => {
        let navIconClassName = "";
        let appBarClassName = classes.appBar;

        if (title === null) {
          // home route, don't shift app bar or dock drawer
          appBarClassName += ` ${classes.appBarHome}`;
        } else {
          navIconClassName = classes.navIconHide;
          appBarClassName += ` ${classes.appBarShift}`;
        }

        return (
          <div className={classes.root}>
            {/* <NProgressBar /> */}
            <CssBaseline />
            <AppBar className={appBarClassName}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleDrawerOpen}
                  className={navIconClassName}
                >
                  <MenuIcon />
                </IconButton>
                {title !== null && (
                  <Typography className={classes.title} variant="h6" noWrap>
                    {title}
                  </Typography>
                )}
                <div className={classes.grow} />
              </Toolbar>
            </AppBar>
            <MiniDrawer onClose={handleDrawerClose} onOpen={handleDrawerOpen} />
            {children}
          </div>
        );
      }}
    </PageTitle>
  );
};

export default AppFrame;
