import { Archer } from '@app/components';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { useCommonStyles } from '../../../../styles/CommonStyles';
import { Connect } from '../Concept2';

const { CustomBox, ArcherElement } = Archer;

const margin = '8px';
const heightHeading = '32px';

export const useInstrumentStyles = makeStyles(() =>
  createStyles({
    instrument: {
      gridArea: 'instrument',
      display: 'grid',
      gridTemplateColumns: `${margin} repeat(3, 1fr) ${margin}`,
      gridTemplateRows: `${heightHeading} ${margin} 1fr ${margin}`,
      gridTemplateAreas: `
      '. head_instrument head_instrument head_instrument .'
      '. . . . .'
      '. preparation_custom . communication_custom .'
      '. . . . .'
      `,
      rowGap: '25px',
      border: '3px solid black'
    },
    head_instrument: {
      gridArea: 'head_instrument'
    },
    preparation_custom: {
      gridArea: 'preparation_custom'
    },
    communication_custom: {
      gridArea: 'communication_custom'
    }
  })
);

export const Instrument: FC<Connect> = ({ relations }) => {
  const classes = useInstrumentStyles();
  const commonClasses = useCommonStyles();

  const { t } = useTranslation();

  return (
    <div className={classes.instrument}>
      <div className={classes.head_instrument}>
        <Typography variant='subtitle1' className={commonClasses.title}>
          {t('pages/ai/general/index:project_millipede')}
        </Typography>
      </div>
      <ArcherElement id='preparation_custom' relations={relations}>
        <div className={classes.preparation_custom}>
          <CustomBox>
            <Typography variant='subtitle1' className={commonClasses.title}>
              {`${t('pages/ai/general/index:preparation_process_custom')} ${t(
                'pages/ai/general/index:preparation_process_custom_abbreviation'
              )}`}
            </Typography>
          </CustomBox>
        </div>
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
        <div className={classes.communication_custom}>
          <CustomBox>
            <Typography variant='subtitle1' className={commonClasses.title}>
              {`${t('pages/ai/general/index:communication_process_custom')} ${t(
                'pages/ai/general/index:communication_process_custom_abbreviation'
              )}`}
            </Typography>
          </CustomBox>
        </div>
      </ArcherElement>
    </div>
  );
};
