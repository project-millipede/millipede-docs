import { createStyles, makeStyles, Slider, Theme, Typography } from '@material-ui/core';
import { TFunction } from 'next-i18next-serverless';
import React, { useState } from 'react';
import { WithTranslation } from 'react-i18next';

import { Item } from '../../../../../docs/src/modules/components/common/grid/Item';
import { Category, CategoryDescriptor, Content, Stack2 } from '../../../../typings/data/import';
import DotsMobileStepper from '../../../../components/common/stepper/DotsMobileStepper';

export const useStyles = makeStyles((_theme: Theme) =>
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
  array: Array<Content> = [],
  step: number
): Array<Content> => {
  return array.map(item => item).filter(value => value.step === step);
};

export const generateGrid = (
  elements: Category,
  categories: CategoryDescriptor,
  step: number,
  classes: Record<any, string>,
  t: TFunction
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
                        {/* Aufmerksamkeitsspanne */}
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

type Props = Stack2 & Partial<WithTranslation>;

const ByExample = ({ elements, categories, t }: Props) => {
  const classes = useStyles({});

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
        {generateGrid(elements as Category, categories, step, classes, t)}
      </div>
      <div
        style={
          {
            // width: '100px',
            // height: '100px'
          }
        }
      >
        <DotsMobileStepper
          steps={
            Object.values(elements).reduce((a, b) => a.concat(b), []).length + 1
          }
          currentStep={(currentStep: number) => {
            setStep(currentStep);
          }}
        />
      </div>
    </div>
  );
};

export { ByExample };
export default ByExample;
