import { Archer, ArcherTypes } from '@app/components';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { useCommonStyles } from '../../../styles/CommonStyles';
import { Instrument } from './components/Instrument';
import { Target } from './components/Target';

const { ArcherContainer, CustomBox, ArcherElement } = Archer;

export const useStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    gridTemplateRows: '1fr 0.5fr 1fr',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateAreas: `
      'target target target'
      '. render .'
      'instrument instrument instrument'
      `,
    rowGap: '50px'
  },
  render: {
    gridArea: 'render'
  }
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
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.grid}>
        <Target relations={targetConnect.relations} />
        <div className={classes.render}>
          <ArcherElement id='shared_render'>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {`${t('pages/ai/general/index:shared_render_process')} ${t(
                  'pages/ai/general/index:shared_render_process_abbreviation'
                )}`}
              </Typography>
            </CustomBox>
          </ArcherElement>
        </div>
        <Instrument relations={instrumentConnect.relations} />
      </div>
    </ArcherContainer>
  );
};
