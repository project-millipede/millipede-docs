import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';

import { ChromeInput } from '../input/ChromeInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    browserBar: {
      display: 'flex',
      flexDirection: 'column'
    },
    circleContainer: {
      display: 'flex',
      padding: theme.spacing(1)
    },
    circle: {
      backgroundColor: '#b6c1cd',
      width: '12px',
      height: '12px',
      borderRadius: '6px',
      marginLeft: '6px'
    }
  })
);

const HeaderView: FC = () => {
  const classes = useStyles();

  const { browserBar, circleContainer, circle } = classes;

  return (
    <div className={browserBar}>
      <div className={circleContainer}>
        <div className={circle} />
        <div className={circle} />
        <div className={circle} />
      </div>
      <ChromeInput />
    </div>
  );
};

export default HeaderView;
