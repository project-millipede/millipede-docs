import { Archer } from '@app/components';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { useCommonStyles } from '../../../../styles/CommonStyles';
import { Connect } from '../Concept2';

const { CustomBox, ArcherElement } = Archer;

const margin = '8px';
const heightHeading = '32px';

export const useTargetStyles = makeStyles(() => ({
  target: {
    gridArea: 'target',
    display: 'grid',
    gridTemplateColumns: `${margin} repeat(3, 1fr) ${margin}`,
    gridTemplateRows: `${heightHeading} ${margin} 1fr ${margin}`,
    gridTemplateAreas: `
      '. head_target head_target head_target .'
      '. . . . .'
      '. communication . preparation .'
      '. . . . .'
      `,
    rowGap: '25px',
    border: '3px solid black'
  },
  head_target: {
    gridArea: 'head_target'
  },
  communication: {
    gridArea: 'communication'
  },
  preparation: {
    gridArea: 'preparation'
  }
}));

export const Target: FC<Connect> = ({ relations }) => {
  const classes = useTargetStyles();
  const commonClasses = useCommonStyles();

  const { t } = useTranslation();

  return (
    <div className={classes.target}>
      <div className={classes.head_target}>
        <Typography className={commonClasses.title}>
          {t('pages/ai/general/index:target_application')}
        </Typography>
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
        <div className={classes.communication}>
          <CustomBox>
            <Typography className={commonClasses.title}>
              {`${t('pages/ai/general/index:communication_process')} ${t(
                'pages/ai/general/index:communication_process_abbreviation'
              )}`}
            </Typography>
          </CustomBox>
        </div>
      </ArcherElement>
      <ArcherElement id='preparation' relations={relations}>
        <div className={classes.preparation}>
          <CustomBox>
            <Typography className={commonClasses.title}>
              {`${t('pages/ai/general/index:preparation_process')} ${t(
                'pages/ai/general/index:preparation_process_abbreviation'
              )}`}
            </Typography>
          </CustomBox>
        </div>
      </ArcherElement>
    </div>
  );
};
