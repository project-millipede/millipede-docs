import { Archer } from '@app/components';
import { styled } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { Title } from '../../common';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

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
  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <GridWrapper>
        <div style={{ gridArea: 'head_access' }}>
          <Title>{t('pages/ai/reverse/index:access')}</Title>
        </div>

        <ArcherElement id='function'>
          <CustomBox sx={{ gridArea: 'function' }}>
            <Title>{t('pages/ai/reverse/index:function')}</Title>
          </CustomBox>
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
          <CustomBox sx={{ gridArea: 'instrument' }}>
            <Title>{t('pages/ai/reverse/index:instrument_function')}</Title>
          </CustomBox>
        </ArcherElement>

        <div style={{ gridArea: 'head_analysis' }}>
          <Title>{t('pages/ai/reverse/index:analysis')}</Title>
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
          <CustomBox sx={{ gridArea: 'behavior' }}>
            <Title>{t('pages/ai/reverse/index:determine_behavior')}</Title>
          </CustomBox>
        </ArcherElement>

        <div style={{ gridArea: 'head_exposure' }}>
          <Title>{t('pages/ai/reverse/index:exposure')}</Title>
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
          <CustomBox sx={{ gridArea: 'derive' }}>
            <Title>{t('pages/ai/reverse/index:derive_attack_vector')}</Title>
          </CustomBox>
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
          <CustomBox sx={{ gridArea: 'apply' }}>
            <Title>{t('pages/ai/reverse/index:apply_attack_vector')}</Title>
          </CustomBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherContainer>
  );
};
