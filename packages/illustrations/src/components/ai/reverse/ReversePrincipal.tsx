import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { I18n } from '@app/utils';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

import { Title } from '../../common';

const { ArcherSurface, ArcherElement } = Archer;

const { InteractiveBox } = Box;

export const GridWrapper = styled('div')(({ theme }) => {
  const margin = theme.spacing(1);
  const heightHeading = theme.spacing(4);

  return {
    display: 'grid',
    gridArea: 'target',
    gridTemplateColumns: `${margin} repeat(3, 1fr) ${margin}`,
    gridTemplateRows: `repeat(3, ${heightHeading} ${margin} 1fr ${margin})`,
    gridTemplateAreas: `
      '. . head_access . .'
      '. . . . .'
      '. function . instrument .'
      '. . . . .'
      '. . head_analysis . .'
      '. . . . .'
      '. . . behavior .'
      '. . . . .'
      '. . head_exposure . .'
      '. . . . .'
      '. apply . derive .'
      '. . . . .'
      `,
    rowGap: theme.spacing(3),
    border: '3px solid black'
  };
});

export const ReversePrincipal: FC = () => {
  const { t } = I18n.useTranslation('pages/ai/reverse/index');

  return (
    <ArcherSurface strokeColor='gray'>
      <GridWrapper>
        <div style={{ gridArea: 'head_access' }}>
          <Title>{t('access')}</Title>
        </div>

        <ArcherElement id='function'>
          <InteractiveBox sx={{ gridArea: 'function' }}>
            <Title>{t('function')}</Title>
          </InteractiveBox>
        </ArcherElement>

        <ArcherElement
          id='instrument'
          relations={[
            {
              targetId: 'function',
              targetAnchor: 'right',
              sourceAnchor: 'left'
            },
            {
              targetId: 'behavior',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <InteractiveBox sx={{ gridArea: 'instrument' }}>
            <Title>{t('instrument_function')}</Title>
          </InteractiveBox>
        </ArcherElement>

        <div style={{ gridArea: 'head_analysis' }}>
          <Title>{t('analysis')}</Title>
        </div>

        <ArcherElement
          id='behavior'
          relations={[
            {
              targetId: 'derive',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <InteractiveBox sx={{ gridArea: 'behavior' }}>
            <Title>{t('determine_behavior')}</Title>
          </InteractiveBox>
        </ArcherElement>

        <div style={{ gridArea: 'head_exposure' }}>
          <Title>{t('exposure')}</Title>
        </div>

        <ArcherElement
          id='derive'
          relations={[
            {
              targetId: 'apply',
              targetAnchor: 'right',
              sourceAnchor: 'left'
            }
          ]}
        >
          <InteractiveBox sx={{ gridArea: 'derive' }}>
            <Title>{t('derive_attack_vector')}</Title>
          </InteractiveBox>
        </ArcherElement>

        <ArcherElement
          id='apply'
          relations={[
            {
              targetId: 'function',
              targetAnchor: 'bottom',
              sourceAnchor: 'top'
            }
          ]}
        >
          <InteractiveBox sx={{ gridArea: 'apply' }}>
            <Title>{t('apply_attack_vector')}</Title>
          </InteractiveBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherSurface>
  );
};
