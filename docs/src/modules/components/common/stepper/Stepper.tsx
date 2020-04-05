import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

interface TranslationProps {
  labelBack: string;
  labelNext: string;
}

interface StepperProps {
  steps: number;
  currentStep: (step: number) => void;
}

type Props = StepperProps & TranslationProps;

export const Stepper = ({
  steps,
  currentStep,
  labelBack,
  labelNext
}: Props) => {
  const classes = useStyles({});

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    currentStep(activeStep);
  });

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant='dots'
      steps={steps}
      position='static'
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button
          size='small'
          onClick={handleNext}
          disabled={activeStep === steps - 1}
        >
          {labelNext}
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          {labelBack}
        </Button>
      }
    />
  );
};
