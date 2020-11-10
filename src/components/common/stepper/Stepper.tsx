import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

interface StepperProps {
  steps: number;
  currentStep: (step: number) => void;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    currentStep(activeStep);
  });

  const { t } = useTranslation();

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
          {t('common:next')}
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          {t('common:back')}
        </Button>
      }
    />
  );
};

export default Stepper;
