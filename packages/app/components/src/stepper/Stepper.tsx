import { Button, MobileStepper } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React, { FC, useCallback, useEffect, useState } from 'react';

export interface TranslationProps {
  labelBack: string;
  labelNext: string;
}

export interface StepperProps {
  steps: number;
  step?: number;
  setStepCb: (step: number) => void;
}

export type StepperWithTranslationProps = StepperProps & TranslationProps;

export const Stepper: FC<StepperWithTranslationProps> = ({
  steps,
  step = 0, // initiated to 0 = no outside control
  setStepCb,
  labelBack,
  labelNext
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const passActiveState = useCallback(
    (value: number) => {
      if (value != null) {
        setStepCb(value);
      }
    },
    [setStepCb]
  );

  useEffect(() => {
    passActiveState(activeStep);
  }, [activeStep]);

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleBack = () => {
    setActiveStep(prevState => prevState - 1);
  };

  const handleNext = () => {
    setActiveStep(prevState => prevState + 1);
  };

  return (
    <MobileStepper
      steps={steps}
      activeStep={activeStep}
      variant='dots'
      position='static'
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
