import { ContentTypes } from '@app/types';
import { CardContent, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { FC, useState } from 'react';

import { Stepper, TranslationProps } from './Stepper';
import { getStepsLength, selectContent } from './StepperContent.svc';

export const renderTitleAndDescription = (
  items: Array<ContentTypes.Content> = []
) => {
  const theme = useTheme();

  return items.map((item, index) => {
    return (
      <Grid
        item
        xs={item.size}
        key={`title-description-${index}`}
        sx={{ p: theme.spacing(1) }}
      >
        <Typography variant='h6' gutterBottom>
          {item.title}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {item.description}
        </Typography>
      </Grid>
    );
  });
};

export type StepperContentWithTranslationProps = TranslationProps &
  ContentTypes.Stack;

export const StepperContent: FC<StepperContentWithTranslationProps> = ({
  elements = [],
  labelBack,
  labelNext
}) => {
  const [step, setStep] = useState(0);

  const max = getStepsLength(elements);

  const stepContent = selectContent(elements, step);

  const [{ image }] = stepContent;

  return (
    <Grid container>
      {image ? (
        <Grid item xs={12}>
          <CardContent>{image}</CardContent>
        </Grid>
      ) : null}
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
      {renderTitleAndDescription(stepContent)}
    </Grid>
  );
};
