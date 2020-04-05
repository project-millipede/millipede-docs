import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React from 'react';

import { RootState } from '../redux/reducers';

interface Props extends React.Props<any> {
  disableToc?: boolean;
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
        maxWidth: 'calc(100% - 225px - 240px)'
      }
    },
    closedDrawer: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: 'calc(100% - 73px)'
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        maxWidth: 'calc(100% - 73px - 240px)'
      }
    },
    disableToc: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: 'calc(100%)'
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 'calc(100% - 240px)'
      }
    }
  })
);

const AppContent = ({ children, disableToc }: Props) => {
  const classes = useStyles({});

  const {
    state: {
      view: { isOpen }
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
        [classes.openedDrawer]: isOpen,
        [classes.closedDrawer]: !isOpen,
        [classes.disableToc]: disableToc
      })}
    >
      {children}
    </Container>
  );
};

export default AppContent;
