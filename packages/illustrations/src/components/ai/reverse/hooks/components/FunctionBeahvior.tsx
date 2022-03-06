import { Archer } from '@app/components';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

import { TitleUnstyled } from '../../../../common';

const { ArcherSurface, ArcherElement, InteractiveBox } = Archer;
export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '0.5fr 1fr 0.5fr',
  gridTemplateAreas: `
    '. function_a .'
    '. function_b .'
    '. function_result .'
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

const functionResult = `public int a() {
    int x = c;
    ...
}`;

export const FunctionBeahvior: FC = () => {
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
              targetId: 'function_result',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <InteractiveBox sx={{ gridArea: 'function_b' }}>
            <TitleUnstyled variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
              {functionB}
            </TitleUnstyled>
          </InteractiveBox>
        </ArcherElement>

        <ArcherElement id='function_result'>
          <InteractiveBox sx={{ gridArea: 'function_result' }}>
            <TitleUnstyled variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
              {functionResult}
            </TitleUnstyled>
          </InteractiveBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherSurface>
  );
};
