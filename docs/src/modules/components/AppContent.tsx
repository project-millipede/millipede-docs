import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

interface AppContentProps {
  disableToc?: boolean;
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(12),
      outline: 'none',
      hyphens: 'auto',
      '-ms-hyphens': 'auto',
      '-moz-hyphens': 'auto',
      '-webkit-hyphens': 'auto'
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

  return (
    <Container
      component='main'
      id='main-content'
      tabIndex={-1}
      className={clsx(classes.root, {
        [classes.disableToc]: disableToc
      })}
    >
      {children}
    </Container>
  );
};

export default AppContent;
