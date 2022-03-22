import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { styled } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
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
        <InteractiveBox sx={{ gridArea: 'preparation_custom' }}>
          <Title>
            {`${t('pages/ai/general/index:preparation_process_custom')} ${t(
              'pages/ai/general/index:preparation_process_custom_abbreviation'
            )}`}
          </Title>
        </InteractiveBox>
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
        <InteractiveBox sx={{ gridArea: 'communication_custom' }}>
          <Title>
            {`${t('pages/ai/general/index:communication_process_custom')} ${t(
              'pages/ai/general/index:communication_process_custom_abbreviation'
            )}`}
          </Title>
        </InteractiveBox>
      </ArcherElement>
    </GridWrapper>
  );
};
