import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { I18n } from '@app/utils';
import { styled } from '@mui/material/styles';
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
  const { t } = I18n.useTranslation('pages/ai/general/index');

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
              {`${t('communication_process')} ${t(
                'communication_process_abbreviation'
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
              {`${t('preparation_process')} ${t(
                'preparation_process_abbreviation'
              )}`}
            </Title>
          </InteractiveBox>
        </ArcherElement>
        <ArcherElement id='render'>
          <InteractiveBox sx={{ gridArea: 'render' }}>
            <Title>
              {`${t('render_process')} ${t('render_process_abbreviation')}`}
            </Title>
          </InteractiveBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherSurface>
  );
};
