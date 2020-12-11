import { Stepper } from '@app/components';
import { ContentTypes } from '@app/types';
import { createStyles, makeStyles, Slider, Typography } from '@material-ui/core';
import { Translate } from 'next-translate';
import React, { useState } from 'react';

import { Item } from '../../../../../docs/src/modules/components/common/grid/Item';

export const useStyles = makeStyles(() =>
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
    title: {
      textAlign: 'left',
      fontWeight: 'bold'
    }
  })
);

// const stepsLength = (array: Array<Content> = []): number => {
//   return array
//     .map(item => item.step)
//     .filter((value, index, self) => self.indexOf(value) === index).length;
// };

export const stepsFiltered = (
  array: Array<ContentTypes.Content> = [],
  step: number
): Array<ContentTypes.Content> => {
  return array.map(item => item).filter(value => value.step === step);
};

export const generateGrid = (
  elements: ContentTypes.Category,
  categories: ContentTypes.CategoryDescriptor,
  step: number,
  classes: Record<any, string>,
  t: Translate
) => {
  return (
    <div
    // className={classes.column}
    >
      {/* {Object.keys(categories).map(category => { */}
      {Object.values(categories)
        .sort((a, b) => a.step - b.step)
        .map(category => {
          return elements && elements[category.id]
            ? elements[category.id]
                .filter(item => item.order === step)
                .map((element, _index) => {
                  return (
                    <>
                      <Item
                        title={element.title}
                        description={element.description}
                        // link={data.link}
                        // icon={data.icon}
                      />
                      <Typography variant='subtitle1' className={classes.title}>
                        {t('attention')}
                      </Typography>
                      {element.userFocus && element.userFocus > 0 ? (
                        <Slider
                          key={element.userFocus}
                          disabled
                          defaultValue={element.userFocus * 100}
                        />
                      ) : null}
                    </>
                  );
                })
            : null;
        })}
    </div>
  );
};

interface TranslationProps {
  t: Translate;
}

type Props = ContentTypes.Stack & TranslationProps;

const ElementComponent = ({ elements, categories, t }: Props) => {
  const classes = useStyles();

  const [step, setStep] = useState(0);

  // return (
  //   <Grid container className={classes.row}>
  //     {generateGrid(elements as Category, categories, step)}
  //     <Grid item xs={9} className={classes.row}>
  //       <DotsMobileStepper
  //         steps={
  //           Object.values(elements).reduce((a, b) => a.concat(b), []).length + 1
  //         }
  //         currentStep={(currentStep: number) => {
  //           setStep(currentStep);
  //         }}
  //       />
  //     </Grid>
  //   </Grid>
  // );
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '16px'
      }}
    >
      <div
        style={
          {
            // width: '100px',
            // height: '100px'
          }
        }
      >
        {generateGrid(
          // elements as ContentTypes.Category,
          elements as any,
          categories,
          step,
          classes,
          t
        )}
      </div>
      <div
        style={
          {
            // width: '100px',
            // height: '100px'
          }
        }
      >
        <Stepper.Stepper
          steps={
            Object.values(elements).reduce((a, b) => a.concat(b), []).length + 1
          }
          setStepCb={(currentStep: number) => {
            setStep(currentStep);
          }}
          labelBack={t('common:back')}
          labelNext={t('common:next')}
        />
      </div>
    </div>
  );
};

export default ElementComponent;
