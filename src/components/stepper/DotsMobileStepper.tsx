import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

interface StepperProps {
  steps: number;
  currentStep: (step: number) => void;
}

function DotsMobileStepper(props: StepperProps) {
  const classes = useStyles();
  // const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    props.currentStep(activeStep);
  });

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <MobileStepper
      variant='dots'
      steps={props.steps}
      position='static'
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size='small' onClick={handleNext} disabled={activeStep === props.steps - 1}>
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  );
}

export default DotsMobileStepper;
