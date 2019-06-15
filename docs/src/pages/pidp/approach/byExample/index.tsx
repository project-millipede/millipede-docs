import { CardContent, Grid, Theme, Typography } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import DotsMobileStepper from '../../../../../../src/components/stepper/DotsMobileStepper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    typographyDisabled: {
      color: theme.palette.text.disabled
    },
    typographyEnabled: {
      color: theme.palette.text.primary
    },
    row: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center"
    }
  })
);

interface ContentItem {
  composition: Composition;
  title: string;
  description: string;
  image?: JSX.Element;
}

interface Composition {
  step: number;
  gridSize: GridSize;
}

interface Content {
  elements: Array<ContentItem>;
}

const stepsLength = (array: Array<ContentItem> = []): number => {
  return array
    .map(item => item.composition.step)
    .filter((value, index, self) => self.indexOf(value) === index).length;
};

const stepsFiltered = (array: Array<ContentItem> = [], step: number): Array<ContentItem> => {
  return array.map(item => item).filter(value => value.composition.step === step);
};

const generateGrid = (elements: Array<ContentItem> = [], active: boolean) => {
  const classes = useStyles();
  return elements.map((content, index) => {
    const { composition } = content;
    return (
      <Grid
        item
        xs={composition.gridSize}
        className={classes.row}
        key={`${content.title} ${index}`}
      >
        <CardContent className={classes.paper}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={active ? classes.typographyEnabled : classes.typographyDisabled}
          >
            {content.title}
          </Typography>
          <Typography
            variant="subtitle2"
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

interface Props {
  content: Content;
}

const ByExample = ({ content: { elements = [] } }: Props) => {
  const classes = useStyles();

  const [step, setStep] = React.useState(0);

  return (
    <Grid container className={classes.row}>
      <Grid item xs={8} className={classes.row}>
        <CardContent className={classes.paper}>
          {stepsFiltered(elements, step)[0].image}
        </CardContent>
      </Grid>
      <Grid item xs={8} className={classes.row}>
        <DotsMobileStepper
          steps={stepsLength(elements)}
          currentStep={(currentStep: number) => {
            setStep(currentStep);
          }}
        />
      </Grid>
      {generateGrid(stepsFiltered(elements, step), true)}
    </Grid>
  );
};

export { ByExample };
export default ByExample;
