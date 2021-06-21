import { Archer } from '@app/components';
import { styled } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { Instrument } from './components/Instrument';
import { Render } from './components/Render';
import { Target } from './components/Target';
import { Connect } from './Concept2';

const { ArcherContainer } = Archer;

export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: `
      'target'
      'render'
      'instrument'
      `,
  rowGap: theme.spacing(6)
}));

const targetConnect: Connect = {
  relations: [
    {
      targetId: 'render',
      targetAnchor: 'top',
      sourceAnchor: 'bottom'
    }
  ]
};

const instrumentConnect: Connect = {
  relations: [
    {
      targetId: 'custom_render',
      targetAnchor: 'bottom',
      sourceAnchor: 'top'
    }
  ]
};

export const Concept3: FC = () => {
  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <GridWrapper>
        <Target relations={targetConnect.relations} />
        <Render />
        <Instrument relations={instrumentConnect.relations} />
      </GridWrapper>
    </ArcherContainer>
  );
};
