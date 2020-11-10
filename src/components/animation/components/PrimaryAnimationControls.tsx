import { useHoux } from '@houx';
import { createStyles, IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SmartphoneRoundedIcon from '@material-ui/icons/SmartphoneRounded';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Translate } from 'next-translate';
import React, { Dispatch, FC, MouseEvent } from 'react';

import { AnimationActions } from '../../../../docs/src/modules/redux/features/actionType';
import { changeArea, changeDevice, changeSzenario } from '../../../../docs/src/modules/redux/features/animation/actions';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { Area, Device, Szenario } from '../../../typings/animation';

interface ControlsProps {
  t?: Translate;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    },
    text: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    group: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    icon: {
      margin: 'auto'
    }
  })
);

export const PrimaryAnimationControls: FC<ControlsProps> = ({ t }) => {
  const classes = useStyles();

  const {
    dispatch,
    state: {
      animation: { szenario }
    }
  }: {
    dispatch: Dispatch<AnimationActions>;
    state: RootState;
  } = useHoux();

  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newSzenario: Szenario
  ) => {
    dispatch(changeSzenario(newSzenario));
  };

  const children = [
    <ToggleButton key={1} value={Szenario.Default}>
      {t('pages/pidp/use-case/recognition/index:Default')}
    </ToggleButton>,
    <ToggleButton key={2} value={Szenario.Pet}>
      {t('pages/pidp/use-case/recognition/index:PET')}
    </ToggleButton>,
    <ToggleButton key={3} value={Szenario.Pidp}>
      {t('pages/pidp/use-case/recognition/index:PID/P')}
    </ToggleButton>
  ];

  return (
    <Paper
      elevation={3}
      classes={{
        root: classes.column
      }}
    >
      <Typography
        className={classes.text}
        color='textPrimary'
        component='h4'
        variant='h6'
      >
        {t('pages/pidp/use-case/recognition/index:Szenario')}
      </Typography>
      <ToggleButtonGroup
        className={classes.group}
        size='medium'
        value={szenario}
        exclusive
        onChange={handleChange}
      >
        {children}
      </ToggleButtonGroup>
    </Paper>
  );
};

export const SecondaryAnimationControls: FC<ControlsProps> = ({ t }) => {
  const classes = useStyles();

  const {
    dispatch,
    state: {
      animation: { area }
    }
  }: {
    dispatch: Dispatch<AnimationActions>;
    state: RootState;
  } = useHoux();

  const handleAreaChange = (_event: MouseEvent<HTMLElement>, newArea: Area) => {
    dispatch(changeArea(newArea));
  };

  const children = [
    <ToggleButton key={1} value={Area.Local}>
      {t('pages/pidp/use-case/recognition/index:Local')}
    </ToggleButton>,
    <ToggleButton key={2} value={Area.Global}>
      {t('pages/pidp/use-case/recognition/index:Global')}
    </ToggleButton>
  ];

  return (
    <Paper
      elevation={3}
      classes={{
        root: classes.column
      }}
    >
      <Typography
        className={classes.text}
        color='textPrimary'
        component='h4'
        variant='h6'
      >
        {t('pages/pidp/use-case/recognition/index:Layout')}
      </Typography>
      <ToggleButtonGroup
        className={classes.group}
        size='medium'
        value={area}
        exclusive
        onChange={handleAreaChange}
      >
        {children}
      </ToggleButtonGroup>
    </Paper>
  );
};

export const DeviceControls: FC<ControlsProps> = ({ t }) => {
  const classes = useStyles();

  const {
    dispatch,
    state: {
      animation: { device }
    }
  }: {
    dispatch: Dispatch<AnimationActions>;
    state: RootState;
  } = useHoux();

  const animateMobile = () => {
    dispatch(changeDevice(Device.Mobile));
  };

  const animateDesktop = () => {
    dispatch(changeDevice(Device.Desktop));
  };

  return (
    <Paper
      elevation={3}
      classes={{
        root: classes.column
      }}
    >
      <Typography
        className={classes.text}
        color='textPrimary'
        component='h4'
        variant='h6'
      >
        {t('pages/pidp/use-case/recognition/index:Device')}
      </Typography>
      <IconButton
        className={classes.icon}
        onClick={() => {
          if (device === Device.Mobile) {
            animateDesktop();
          } else {
            animateMobile();
          }
        }}
      >
        {device === Device.Desktop ? (
          <SmartphoneRoundedIcon />
        ) : (
          <DesktopWindowsIcon />
        )}
      </IconButton>
    </Paper>
  );
};
