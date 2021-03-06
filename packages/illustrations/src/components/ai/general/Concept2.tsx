import { Archer, ArcherTypes } from '@app/components';
import { styled } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { Title } from '../../common';
import { Instrument } from './components/Instrument';
import { Target } from './components/Target';

const { ArcherContainer, CustomBox, ArcherElement } = Archer;

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
    <ArcherContainer noCurves strokeColor='gray'>
      <GridWrapper>
        <Target relations={targetConnect.relations} />

        <ArcherElement id='shared_render'>
          <CustomBox sx={{ gridArea: 'render' }}>
            <Title>
              {`${t('pages/ai/general/index:shared_render_process')} ${t(
                'pages/ai/general/index:shared_render_process_abbreviation'
              )}`}
            </Title>
          </CustomBox>
        </ArcherElement>
        <Instrument relations={instrumentConnect.relations} />
      </GridWrapper>
    </ArcherContainer>
  );
};
