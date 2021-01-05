import { Archer } from '@app/components';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

export const useStyles = makeStyles(() =>
  createStyles({
    code: {
      whiteSpace: 'pre-wrap'
    },
    grid: {
      display: 'grid',
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 0.5fr 1fr',
      gridTemplateAreas: `
      'function_a . .'
      'function_b . function_hook'
      'function_result . .'
      `,
      gridRowGap: '100px'
    },
    function_a: {
      gridArea: 'function_a'
    },
    function_b: {
      gridArea: 'function_b'
    },
    function_hook: {
      gridArea: 'function_hook'
    },
    function_result: {
      gridArea: 'function_result'
    }
  })
);

const functionA = `public int a() {
    int x = b();
    ...
}`;

const functionB = `public int b() {
    ...
    return c;
}`;

const functionHook = `public int hook_b() {
    ...
    return d;
}`;

const functionHookResult = `public int a() {
    int x = d;
    ...
}`;

export const FunctionBeahviorHook: FC = () => {
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
              targetId: 'function_hook',
              targetAnchor: 'left',
              sourceAnchor: 'right'
            }
          ]}
        >
          <div className={classes.function_b}>
            <CustomBox bgcolor={'#F44336'}>
              <Typography className={classes.code} variant={'body2'}>
                {functionB}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <ArcherElement
          id='function_hook'
          relations={[
            {
              targetId: 'function_b',
              targetAnchor: 'right',
              sourceAnchor: 'left',
              style: { strokeDasharray: '5' }
            },
            {
              targetId: 'function_result',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <div className={classes.function_hook}>
            <CustomBox bgcolor='#4CAF50'>
              <Typography className={classes.code} variant={'body2'}>
                {functionHook}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <ArcherElement id='function_result'>
          <div className={classes.function_result}>
            <CustomBox>
              <Typography className={classes.code} variant={'body2'}>
                {functionHookResult}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};
