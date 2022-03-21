import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

import { TitleUnstyled } from '../../../../common';

const { ArcherSurface, ArcherElement } = Archer;

const { InteractiveBox } = Box;

export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 0.5fr 1fr',
  gridTemplateAreas: `
    'function_a . .'
    'function_b . function_hook'
    'function_result . .'
    `,
  gridRowGap: theme.spacing(12)
}));

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
  return (
    <ArcherSurface strokeColor='gray'>
      <GridWrapper>
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
          <InteractiveBox sx={{ gridArea: 'function_a' }}>
            <TitleUnstyled variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
              {functionA}
            </TitleUnstyled>
          </InteractiveBox>
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
          <InteractiveBox
            sx={{ gridArea: 'function_b', backgroundColor: '#F44336' }}
          >
            <TitleUnstyled variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
              {functionB}
            </TitleUnstyled>
          </InteractiveBox>
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
          <InteractiveBox
            sx={{ gridArea: 'function_hook', backgroundColor: '#4CAF50' }}
          >
            <TitleUnstyled variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
              {functionHook}
            </TitleUnstyled>
          </InteractiveBox>
        </ArcherElement>

        <ArcherElement id='function_result'>
          <InteractiveBox sx={{ gridArea: 'function_result' }}>
            <TitleUnstyled variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
              {functionHookResult}
            </TitleUnstyled>
          </InteractiveBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherSurface>
  );
};
