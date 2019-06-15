import { CardContent, Grid, Theme, Typography } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

import PagesStep0 from '../../../../src/assets/pidp/approach/byExample/PagesStep0';
import PagesStep1 from '../../../../src/assets/pidp/approach/byExample/PagesStep1';
import DotsMobileStepper from '../../../../src/components/stepper/DotsMobileStepper';

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
  image: JSX.Element;
}

interface Composition {
  step: number;
  gridSize: GridSize;
}

interface Content {
  elements: Array<ContentItem>;
}

const stepsLength = (array: Array<ContentItem>): number => {
  return array
    .map(item => item.composition.step)
    .filter((value, index, self) => self.indexOf(value) === index).length;
};

const stepsFiltered = (array: Array<ContentItem>, step: number): Array<ContentItem> => {
  return array.map(item => item).filter(value => value.composition.step === step);
};

const content: Content = {
  elements: [
    {
      composition: {
        step: 0,
        gridSize: 5
      },
      title: "Left-sided arranged book page",
      description:
        "In the initial state, the book on the left does not exist and can be equated with the representation of a placeholder.",
      image: <PagesStep0 style={{ width: "75%" }} />
    },
    {
      composition: {
        step: 0,
        gridSize: 5
      },
      title: "Right-sided book page",
      description:
        "Corresponds to the original of a website or mobile application or the message stream communicated to the user by the application type.",
      image: <PagesStep0 style={{ width: "75%" }} />
    },
    {
      composition: {
        step: 1,
        gridSize: 10
      },
      title: "Behavior",
      description:
        "The technique transforms the display and presentation format of any application on the user's device. This action, carried out during the handling of an existing application, generates the left-sided book page. The book page inserted in this manner encompasses content that supplements or corrects the original content on the opposing book page.",
      image: <PagesStep1 style={{ width: "75%" }} />
    }
  ]
};

const generateGrid = (elements: Array<ContentItem>, active: boolean) => {
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
            <blockquote>{content.description}</blockquote>
          </Typography>
        </CardContent>
      </Grid>
    );
  });
};

function ByExample() {
  const classes = useStyles();

  const [step, setStep] = React.useState(0);

  return (
    <Grid container className={classes.row}>
      <Grid item xs={8} className={classes.row}>
        <CardContent className={classes.paper}>
          {stepsFiltered(content.elements, step)[0].image}
        </CardContent>
      </Grid>
      <Grid item xs={8} className={classes.row}>
        <DotsMobileStepper
          steps={stepsLength(content.elements)}
          currentStep={(currentStep: number) => {
            setStep(currentStep);
          }}
        />
      </Grid>
      {generateGrid(stepsFiltered(content.elements, step), true)}
    </Grid>
  );
}

export default ByExample;
