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
    gridArea: 'instrument',
    gridTemplateColumns: `${margin} repeat(3, 1fr) ${margin}`,
    gridTemplateRows: `${heightHeading} ${margin} 1fr ${margin}`,
    gridTemplateAreas: `
      '. head_instrument head_instrument head_instrument .'
      '. . . . .'
      '. preparation_custom . communication_custom .'
      '. . . . .'
      `,
    rowGap: theme.spacing(3),
    border: '3px solid black'
  };
});

export const Instrument: FC<Connect> = ({ relations }) => {
  const { t } = useTranslation();

  return (
    <GridWrapper>
      <div style={{ gridArea: 'head_instrument' }}>
        <Title>{t('pages/ai/general/index:project_millipede')}</Title>
      </div>
      <ArcherElement id='preparation_custom' relations={relations}>
        <CustomBox sx={{ gridArea: 'preparation_custom' }}>
          <Title>
            {`${t('pages/ai/general/index:preparation_process_custom')} ${t(
              'pages/ai/general/index:preparation_process_custom_abbreviation'
            )}`}
          </Title>
        </CustomBox>
      </ArcherElement>
      <ArcherElement
        id='communication_custom'
        relations={[
          {
            targetId: 'preparation_custom',
            targetAnchor: 'right',
            sourceAnchor: 'left'
          }
        ]}
      >
        <CustomBox sx={{ gridArea: 'communication_custom' }}>
          <Title>
            {`${t('pages/ai/general/index:communication_process_custom')} ${t(
              'pages/ai/general/index:communication_process_custom_abbreviation'
            )}`}
          </Title>
        </CustomBox>
      </ArcherElement>
    </GridWrapper>
  );
};
