import { CardContent, Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import DotsMobileStepper from '../../../../../../src/components/stepper/DotsMobileStepper';
import { Content, Stack } from '../../../../../../src/typings/data/import';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      // padding: theme.spacing(2),
      textAlign: 'center'
      // color: theme.palette.text.secondary
    },
    typographyDisabled: {
      // color: theme.palette.text.disabled
    },
    typographyEnabled: {
      // color: theme.palette.text.primary
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    col: {
      flexDirection: 'column'
    }
  })
);

const stepsLength = (array: Array<Content> = []): number => {
  return array.map(item => item.step).filter((value, index, self) => self.indexOf(value) === index)
    .length;
};

const stepsFiltered = (array: Array<Content> = [], step: number): Array<Content> => {
  return array.map(item => item).filter(value => value.step === step);
};

const generateGrid = (elements: Array<Content> = [], active: boolean) => {
  const classes = useStyles({});
  return elements.map((content, index) => {
    return (
      <Grid item xs={content.size} key={`${content.title} ${index}`}>
        <CardContent className={classes.paper}>
          <Typography
            variant='subtitle1'
            gutterBottom
            className={active ? classes.typographyEnabled : classes.typographyDisabled}
          >
            {content.title}
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            className={active ? classes.typographyEnabled : classes.typographyDisabled}
          >
            {content.description}
          </Typography>
        </CardContent>
      </Grid>
    );
  });
};

const Comparison = ({ elements = [] }: Stack) => {
  const classes = useStyles({});

  const [step, setStep] = React.useState(0);

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <CardContent className={classes.paper}>
          {stepsFiltered(elements, step)[0].image}
        </CardContent>
      </Grid>

      <Grid item>
        <DotsMobileStepper
          steps={stepsLength(elements)}
          currentStep={(currentStep: number) => {
            setStep(currentStep);
          }}
        />
      </Grid>
      <Grid container>{generateGrid(stepsFiltered(elements, step), true)}</Grid>
    </Grid>
  );
};

export { Comparison };
export default Comparison;
