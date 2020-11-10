import { useHoux } from '@houx';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import { RootState } from '../redux/reducers';

interface AppContentProps {
  disableToc?: boolean;
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 80 + 16,
      outline: 'none',
      hyphens: 'auto',
      '-ms-hyphens': 'auto',
      '-moz-hyphens': 'auto',
      '-webkit-hyphens': 'auto'
    },
    openedDrawer: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: 'calc(100% - 225px)'
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        maxWidth: 'calc(100% - 225px - 280px)'
      }
    },
    closedDrawer: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: 'calc(100% - 73px)'
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        maxWidth: 'calc(100% - 73px - 280px)'
      }
    },
    disableToc: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: 'calc(100%)'
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 'calc(100% - 280px)'
      }
    }
  })
);

const AppContent: FC<AppContentProps> = ({ children, disableToc }) => {
  const classes = useStyles();

  const {
    state: {
      view: { isDrawerExpanded, isMobile }
    }
  }: {
    state: RootState;
  } = useHoux();

  return (
    <Container
      component='main'
      id='main-content'
      tabIndex={-1}
      className={clsx(classes.root, {
        [classes.openedDrawer]: !isMobile && isDrawerExpanded,
        [classes.closedDrawer]: !isMobile && !isDrawerExpanded,
        [classes.disableToc]: disableToc
      })}
    >
      {children}
    </Container>
  );
};

export default AppContent;
