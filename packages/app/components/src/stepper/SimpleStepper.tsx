import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';
import React, { FC } from 'react';

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

export const SimpleStepper: FC<StepperWithTranslationProps> = ({
  steps,
  step = 0, // initiated to 0 = no outside control
  setStepCb,
  labelBack,
  labelNext
}) => {
  const handleBack = () => {
    setStepCb(step - 1);
  };

  const handleNext = () => {
    setStepCb(step + 1);
  };

  return (
    <MobileStepper
      steps={steps}
      activeStep={step}
      variant='dots'
      position='static'
      backButton={
        <Button
          size='small'
          onClick={handleBack}
          disabled={step === 0}
          id='back'
        >
          <KeyboardArrowLeft />
          {labelBack}
        </Button>
      }
      nextButton={
        <Button
          size='small'
          onClick={handleNext}
          disabled={step === steps - 1}
          id='next'
        >
          {labelNext}
          <KeyboardArrowRight />
        </Button>
      }
    />
  );
};
