import { createStyles, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

import { ChromeInput } from '../components/ChromeInput';

const useStyles = makeStyles(() =>
  createStyles({
    browserBar: {
      display: 'flex',
      flexDirection: 'column'
    },
    circleContainer: {
      display: 'flex',
      padding: '8px'
    },
    circle: {
      backgroundColor: '#b6c1cd',
      width: '10px',
      height: '10px',
      borderRadius: '5px',
      marginLeft: '5px'
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
