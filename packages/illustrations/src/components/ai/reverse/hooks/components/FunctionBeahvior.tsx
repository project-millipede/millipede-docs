import { Archer } from '@app/components';
import { makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

export const useStyles = makeStyles(() => ({
  code: {
    whiteSpace: 'pre-wrap'
  },
  grid: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateColumns: '0.5fr 1fr 0.5fr',
    gridTemplateAreas: `
      '. function_a .'
      '. function_b .'
      '. function_result .'
      `,
    gridRowGap: '100px'
  },
  function_a: {
    gridArea: 'function_a'
  },
  function_b: {
    gridArea: 'function_b'
  },
  function_result: {
    gridArea: 'function_result'
  }
}));

const functionA = `public int a() {
    int x = b();
    ...
}`;

const functionB = `public int b() {
    ...
    return c;
}`;

const functionResult = `public int a() {
    int x = c;
    ...
}`;

export const FunctionBeahvior: FC = () => {
  const classes = useStyles();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.grid}>
        <ArcherElement
          id='function_a'
          relations={[
            {
              targetId: 'function_b',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <div className={classes.function_a}>
            <CustomBox>
              <Typography className={classes.code} variant={'body2'}>
                {functionA}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
        <ArcherElement
          id='function_b'
          relations={[
            {
              targetId: 'function_result',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <div className={classes.function_b}>
            <CustomBox>
              <Typography className={classes.code} variant={'body2'}>
                {functionB}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <ArcherElement id='function_result'>
          <div className={classes.function_result}>
            <CustomBox>
              <Typography className={classes.code} variant={'body2'}>
                {functionResult}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};
