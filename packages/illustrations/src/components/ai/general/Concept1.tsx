import { Archer } from '@app/components';
import { styled } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { Title } from '../../common';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '0.5fr 1fr 0.5fr',
  gridTemplateAreas: `
      '. communication .'
      '. preparation .'
      '. render .'
      `,
  rowGap: theme.spacing(12)
}));

export const Concept1: FC = () => {
  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <GridWrapper>
        <ArcherElement
          id='communication'
          relations={[
            {
              targetId: 'preparation',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <CustomBox sx={{ gridArea: 'communication' }}>
            <Title>
              {`${t('pages/ai/general/index:communication_process')} ${t(
                'pages/ai/general/index:communication_process_abbreviation'
              )}`}
            </Title>
          </CustomBox>
        </ArcherElement>
        <ArcherElement
          id='preparation'
          relations={[
            {
              targetId: 'render',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <CustomBox sx={{ gridArea: 'preparation' }}>
            <Title>
              {`${t('pages/ai/general/index:preparation_process')} ${t(
                'pages/ai/general/index:preparation_process_abbreviation'
              )}`}
            </Title>
          </CustomBox>
        </ArcherElement>
        <ArcherElement id='render'>
          <CustomBox sx={{ gridArea: 'render' }}>
            <Title>
              {`${t('pages/ai/general/index:render_process')} ${t(
                'pages/ai/general/index:render_process_abbreviation'
              )}`}
            </Title>
          </CustomBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherContainer>
  );
};
