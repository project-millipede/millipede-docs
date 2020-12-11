import { CardContent, createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';

import { Stepper } from './Stepper';
import { Content, MergedStepperContentProps } from './types';

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      justifyContent: 'center'
    }
  })
);

const getStepsLength = (elements: Array<Content> = []): number => {
  return elements.map(item => item.step).reduce(findMax, 0);
};

const findMax = (acc: number, value: number) => {
  return Math.max(acc, value);
};

const stepsFiltered = (
  array: Array<Content> = [],
  step: number
): Array<Content> => {
  return array.filter(value => value.step === step).map(value => value);
};

export const renderTitleAndDescription = (items: Array<Content> = []) => {
  const classes = useStyles();

  return items.map((item, index) => {
    return (
      <Grid
        item
        xs={item.size}
        className={classes.row}
        key={`title-description-${index}`}
      >
        <CardContent>
          <Typography variant='subtitle1' gutterBottom>
            {item.title}
          </Typography>
          <Typography variant='subtitle2' gutterBottom>
            {item.description}
          </Typography>
        </CardContent>
      </Grid>
    );
  });
};

export const StepperContent: FC<MergedStepperContentProps> = ({
  elements = [],
  labelBack,
  labelNext
}) => {
  const [step, setStep] = useState(0);

  const max = getStepsLength(elements);

  const currentSteps = stepsFiltered(elements, step);
  const [firstItem] = currentSteps;

  return (
    <Grid container>
      <Grid item xs={12}>
        <CardContent>{firstItem.image}</CardContent>
      </Grid>
      <Grid item xs={12}>
        <Stepper
          steps={max + 1}
          setStepCb={(currentStep: number) => {
            setStep(currentStep);
          }}
          labelBack={labelBack}
          labelNext={labelNext}
        />
      </Grid>
      {renderTitleAndDescription(currentSteps)}
    </Grid>
  );
};
