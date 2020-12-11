import { Button, createStyles, makeStyles, MobileStepper } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { MergedStepperProps } from './types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const StepperAdv: FC<MergedStepperProps> = ({
  steps,
  step,
  setStepCb,
  labelBack,
  labelNext
}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const passActiveState = useCallback(
    (value: number) => {
      setStepCb(value);
    },
    [setStepCb]
  );

  useEffect(() => {
    passActiveState(activeStep);
  }, [activeStep]);

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleNext = () => {
    setActiveStep(prevState => prevState + 1);
  };

  const handleBack = () => {
    setActiveStep(prevState => prevState - 1);
  };

  return (
    <MobileStepper
      steps={steps}
      activeStep={activeStep}
      variant='dots'
      position='static'
      className={classes.root}
      backButton={
        steps > 0 ? (
          <Button
            size='small'
            onClick={handleBack}
            disabled={activeStep === 0}
            id={'back'}
          >
            <KeyboardArrowLeft />
            {labelBack}
          </Button>
        ) : null
      }
      nextButton={
        steps > 0 ? (
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === steps - 1}
            id={'next'}
          >
            {labelNext}
            <KeyboardArrowRight />
          </Button>
        ) : null
      }
    />
  );
};
