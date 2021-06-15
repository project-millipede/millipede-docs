import { Archer } from '@app/components';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

import { Instrument } from './components/Instrument';
import { Render } from './components/Render';
import { Target } from './components/Target';
import { Connect } from './Concept2';

const { ArcherContainer } = Archer;

export const useGridStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      'target'
      'render'
      'instrument'
      `,
    rowGap: '50px'
  }
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
  const classes = useGridStyles();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.grid}>
        <Target relations={targetConnect.relations} />
        <Render />
        <Instrument relations={instrumentConnect.relations} />
      </div>
    </ArcherContainer>
  );
};
