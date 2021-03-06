import { Archer } from '@app/components';
import { styled } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { Title } from '../../../common';
import { Connect } from '../Concept2';

const { CustomBox, ArcherElement } = Archer;

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
  const { t } = useTranslation();

  return (
    <GridWrapper>
      <div style={{ gridArea: 'head_target' }}>
        <Title>{t('pages/ai/general/index:target_application')}</Title>
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
        <CustomBox sx={{ gridArea: 'communication' }}>
          <Title>
            {`${t('pages/ai/general/index:communication_process')} ${t(
              'pages/ai/general/index:communication_process_abbreviation'
            )}`}
          </Title>
        </CustomBox>
      </ArcherElement>
      <ArcherElement id='preparation' relations={relations}>
        <CustomBox sx={{ gridArea: 'preparation' }}>
          <Title>
            {`${t('pages/ai/general/index:preparation_process')} ${t(
              'pages/ai/general/index:preparation_process_abbreviation'
            )}`}
          </Title>
        </CustomBox>
      </ArcherElement>
    </GridWrapper>
  );
};
