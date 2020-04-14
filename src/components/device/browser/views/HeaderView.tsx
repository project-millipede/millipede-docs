import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useHoux } from 'houx';
import React, { FC } from 'react';

import { RootState } from '../../../../../docs/src/modules/redux/reducers';
import { Device } from '../../../../typings/animation';
import { TopRevealMin } from '../../../animation/framer/components/container/TopRevealMin';
import ChromeInput from '../components/ChromeInput';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    browserBar: {
      // backgroundColor: '#ffffff',
      // borderBottom: '1px solid #dfe5eb',
      // height: '24px'
      height: '60px',
      display: 'flex',
      flexDirection: 'column'
    },
    circlesContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: '7px 0 8px 0',
      marginLeft: '3px'
    },
    circle: {
      backgroundColor: '#b6c1cd',
      width: '9px',
      height: '9px',
      borderRadius: '4.5px',
      marginLeft: '6px'
    }
  })
);

const HeaderView: FC = () => {
  const classes = useStyles();

  const { browserBar, circlesContainer, circle } = classes;

  const {
    state: {
      animation: { device }
    }
  }: {
    state: RootState;
  } = useHoux();

  return (
    <TopRevealMin id={`header-${1}`} toggle={device === Device.Desktop}>
      <div className={browserBar}>
        <div className={circlesContainer}>
          <div className={circle} />
          <div className={circle} />
          <div className={circle} />
        </div>
        <ChromeInput />
      </div>
    </TopRevealMin>
  );
};

export default HeaderView;
