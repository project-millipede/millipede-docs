import Container from '@material-ui/core/Container';
import { createStyles, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

interface Props extends React.Props<any> {
  className?: string;
  disableToc?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 80 + 16,
      flex: '1 1 100%',
      position: 'relative',
      maxWidth: '100%',
      margin: '0 auto',
      [theme.breakpoints.up('sm')]: {
        paddingRight: theme.spacing(1),
        maxWidth: 'calc(100% - 175px)'
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        maxWidth: 'calc(100% - 175px - 240px)'
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

const AppContent = ({ className, children, disableToc }: Props) => {
  const classes = useStyles({});

  return (
    <Container
      component='main'
      id='main-content'
      tabIndex={-1}
      className={clsx(classes.root, className, {
        [classes.disableToc]: disableToc
      })}
    >
      {children}
    </Container>
  );
};

export default AppContent;
