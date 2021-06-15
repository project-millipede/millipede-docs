import { Theme } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { FullScreenHandle } from 'react-full-screen';

import { ChromeInput } from '../input/ChromeInput';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

interface HeaderViewProps {
  fullScreenHandle: FullScreenHandle;
  style?: CSSProperties;
}

export const HeaderView: FC<HeaderViewProps> = ({
  fullScreenHandle,
  style
}) => {
  const classes = useStyles();

  const { browserBar, circleContainer, circle } = classes;

  return (
    <div className={browserBar} style={{ ...style }}>
      <div className={circleContainer}>
        <div className={circle} />
        <div className={circle} />
        <div className={circle} />
      </div>
      <ChromeInput fullScreenHandle={fullScreenHandle} />
    </div>
  );
};
