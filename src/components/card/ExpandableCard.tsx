import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from 'next/link';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import AvatarGrid from '../avatar/AvatarGrid';

// import { autoPlay } from 'react-swipeable-views-utils';
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export interface OverviewStep {
  label: string;
  imgPath?: string;
}

export interface OverviewProps {
  title: string;
  subTitle: string;
  letter: Array<string>;
  link: string;
  steps: Array<OverviewStep>;
}

const ExpandableCard = ({ title, subTitle, letter, link, steps = [] }: OverviewProps) => {
  const classes = useStyles({});
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);

  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStepChange = (value: number) => {
    setActiveStep(value);
  };

  return (
    <Card>
      <CardHeader avatar={<AvatarGrid letter={letter} />} title={title} subheader={subTitle} />
      <CardContent>
        <SwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
          {steps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2
                ? // <img className={classes.img} src={step.imgPath} alt={step.label} />
                  step.label
                : null}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position='static'
          // variant="text"
          activeStep={activeStep}
          nextButton={
            <Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
        />
      </CardContent>

      <CardActions
      // className={classes.actions}
      // disableActionSpacing
      >
        <Link href={link}>
          <IconButton aria-label='Learn more'>
            <LaunchIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ExpandableCard;
