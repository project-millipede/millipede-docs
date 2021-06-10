import { makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '24px'
  }
}));

export const SheetContent: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.content}>{children}</div>;
};
