import { createStyles, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    headerWrapper: {
      width: '100%'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '40px',
      position: 'relative'
    },
    indicator: {
      width: '18px',
      height: '4px',
      backgroundColor: '#ddd'
    }
  })
);

export const SheetHeader: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.headerWrapper}>
      {children || (
        <div className={classes.header}>
          <span className={classes.indicator} />
          <span className={classes.indicator} />
        </div>
      )}
    </div>
  );
};
