import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { styled } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { Title } from '../../common';

const { ArcherSurface, ArcherElement } = Archer;

const { InteractiveBox } = Box;

export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '0.5fr 1fr 0.5fr',
  gridTemplateAreas: `
      '. communication .'
      '. preparation .'
      '. render .'
      `,
  rowGap: theme.spacing(6)
}));

export const Concept1: FC = () => {
  const { t } = useTranslation();

  return (
    <ArcherSurface strokeColor='gray'>
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
          <InteractiveBox sx={{ gridArea: 'communication' }}>
            <Title>
              {`${t('pages/ai/general/index:communication_process')} ${t(
                'pages/ai/general/index:communication_process_abbreviation'
              )}`}
            </Title>
          </InteractiveBox>
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
          <InteractiveBox sx={{ gridArea: 'preparation' }}>
            <Title>
              {`${t('pages/ai/general/index:preparation_process')} ${t(
                'pages/ai/general/index:preparation_process_abbreviation'
              )}`}
            </Title>
          </InteractiveBox>
        </ArcherElement>
        <ArcherElement id='render'>
          <InteractiveBox sx={{ gridArea: 'render' }}>
            <Title>
              {`${t('pages/ai/general/index:render_process')} ${t(
                'pages/ai/general/index:render_process_abbreviation'
              )}`}
            </Title>
          </InteractiveBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherSurface>
  );
};
