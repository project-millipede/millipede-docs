import { Archer, ArcherTypes } from '@app/archer';
import { Box } from '@app/components';
import { styled } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { Title } from '../../common';
import { Instrument } from './components/Instrument';
import { Target } from './components/Target';

const { ArcherSurface, ArcherElement } = Archer;

const { InteractiveBox } = Box;

export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 0.5fr 1fr',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateAreas: `
      'target target target'
      '. render .'
      'instrument instrument instrument'
      `,
  rowGap: theme.spacing(6)
}));

export interface Connect {
  relations: Array<ArcherTypes.Relation>;
}

const targetConnect: Connect = {
  relations: [
    {
      targetId: 'shared_render',
      targetAnchor: 'right',
      sourceAnchor: 'bottom'
    }
  ]
};

const instrumentConnect: Connect = {
  relations: [
    {
      targetId: 'shared_render',
      targetAnchor: 'left',
      sourceAnchor: 'top'
    }
  ]
};

export const Concept2: FC = () => {
  const { t } = useTranslation();

  return (
    <ArcherSurface strokeColor='gray'>
      <GridWrapper>
        <Target relations={targetConnect.relations} />
        <ArcherElement id='shared_render'>
          <InteractiveBox sx={{ gridArea: 'render' }}>
            <Title>
              {`${t('pages/ai/general/index:shared_render_process')} ${t(
                'pages/ai/general/index:shared_render_process_abbreviation'
              )}`}
            </Title>
          </InteractiveBox>
        </ArcherElement>
        <Instrument relations={instrumentConnect.relations} />
      </GridWrapper>
    </ArcherSurface>
  );
};
