import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { I18n } from '@app/utils';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

import { Title } from '../../../common';
import { Connect } from '../Concept2';

const { ArcherElement } = Archer;

const { InteractiveBox } = Box;

export const GridWrapper = styled('div')(({ theme }) => {
  const margin = theme.spacing(1);
  const heightHeading = theme.spacing(4);

  return {
    display: 'grid',
    gridArea: 'target',
    gridTemplateColumns: `${margin} repeat(3, 1fr) ${margin}`,
    gridTemplateRows: `${heightHeading} ${margin} 1fr ${margin}`,
    gridTemplateAreas: `
      '. head_target head_target head_target .'
      '. . . . .'
      '. communication . preparation .'
      '. . . . .'
      `,
    rowGap: theme.spacing(3),
    border: '3px solid black'
  };
});

export const Target: FC<Connect> = ({ relations }) => {
  const { t } = I18n.useTranslation('pages/ai/general/index');

  return (
    <GridWrapper>
      <div style={{ gridArea: 'head_target' }}>
        <Title>{t('target_application')}</Title>
      </div>
      <ArcherElement
        id='communication'
        relations={[
          {
            targetId: 'preparation',
            targetAnchor: 'left',
            sourceAnchor: 'right'
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
      <ArcherElement id='preparation' relations={relations}>
        <InteractiveBox sx={{ gridArea: 'preparation' }}>
          <Title>
            {`${t('preparation_process')} ${t(
              'preparation_process_abbreviation'
            )}`}
          </Title>
        </InteractiveBox>
      </ArcherElement>
    </GridWrapper>
  );
};
