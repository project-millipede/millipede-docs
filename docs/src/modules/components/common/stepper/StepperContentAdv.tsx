import { CardContent, createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { Content, Stack } from '../../../../../../src/typings/data/import';
import { StepperAdv } from './StepperAdv';

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

export const StepperContentAdv = ({ elements = [] }: Stack) => {
  const { t } = useTranslation();

  const [step, setStep] = useState(0);

  const max = getStepsLength(elements);

  const currentSteps = stepsFiltered(elements, step);

  return (
    <Grid container>
      <Grid item xs={12}>
        <StepperAdv
          steps={max + 1}
          setStepCb={(currentStep: number) => {
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
