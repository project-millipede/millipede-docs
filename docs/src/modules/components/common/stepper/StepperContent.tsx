import { CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { Content, Stack } from '../../../../../../src/typings/data/import';
import { Stepper } from './Stepper';

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

export const StepperContent = ({ elements = [] }: Stack) => {
  const { t } = useTranslation();

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
          currentStep={(currentStep: number) => {
            setStep(currentStep);
          }}
          labelNext={t('common:next')}
          labelBack={t('common:back')}
        />
      </Grid>
      {renderTitleAndDescription(currentSteps)}
    </Grid>
  );
};
