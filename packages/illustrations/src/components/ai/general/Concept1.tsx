import { Archer } from '@app/components';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { useCommonStyles } from '../../../styles/CommonStyles';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

export const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      display: 'grid',
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '0.5fr 1fr 0.5fr',
      gridTemplateAreas: `
      '. communication .'
      '. preparation .'
      '. render .'
      `,
      gridRowGap: '100px'
    },
    communication: {
      gridArea: 'communication'
    },
    preparation: {
      gridArea: 'preparation'
    },
    render: {
      gridArea: 'render'
    }
  })
);

export const Concept1: FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.grid}>
        <ArcherElement
          id='communication'
          relations={[
            {
              targetId: 'preparation',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
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
        <ArcherElement
          id='preparation'
          relations={[
            {
              targetId: 'render',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
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
        <ArcherElement id='render'>
          <div className={classes.render}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {`${t('pages/ai/general/index:render_process')} ${t(
                  'pages/ai/general/index:render_process_abbreviation'
                )}`}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};
