import { Archer } from '@app/components';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { useCommonStyles } from '../../../styles/CommonStyles';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

const margin = '8px';
const heightHeading = '32px';

export const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      gridArea: 'target',
      display: 'grid',
      gridTemplateColumns: `${margin} repeat(3, 1fr) ${margin}`,
      gridTemplateRows: `repeat(3, ${heightHeading} ${margin} 1fr ${margin})`,
      gridTemplateAreas: `
      '. . head_access . .'
      '. . . . .'
      '. function . instrument .'
      '. . . . .'
      '. . head_analysis . .'
      '. . . . .'
      '. . . behavior .'
      '. . . . .'
      '. . head_exposure . .'
      '. . . . .'
      '. apply . derive .'
      '. . . . .'
      `,
      rowGap: '25px',
      border: '3px solid black'
    },
    head_access: {
      gridArea: 'head_access'
    },
    function: {
      gridArea: 'function'
    },
    instrument: {
      gridArea: 'instrument'
    },
    head_analysis: {
      gridArea: 'head_analysis'
    },
    behavior: {
      gridArea: 'behavior'
    },
    head_exposure: {
      gridArea: 'head_exposure'
    },
    derive: {
      gridArea: 'derive'
    },
    apply: {
      gridArea: 'apply'
    }
  })
);

export const ReversePrincipal: FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.grid}>
        <div className={classes.head_access}>
          <Typography className={commonClasses.title}>
            {t('pages/ai/reverse/index:access')}
          </Typography>
        </div>

        <ArcherElement id='function'>
          <div className={classes.function}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/ai/reverse/index:function')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <ArcherElement
          id='instrument'
          relations={[
            {
              targetId: 'function',
              targetAnchor: 'right',
              sourceAnchor: 'left'
            },
            {
              targetId: 'behavior',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <div className={classes.instrument}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/ai/reverse/index:instrument_function')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <div className={classes.head_analysis}>
          <Typography className={commonClasses.title}>
            {t('pages/ai/reverse/index:analysis')}
          </Typography>
        </div>

        <ArcherElement
          id='behavior'
          relations={[
            {
              targetId: 'derive',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <div className={classes.behavior}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/ai/reverse/index:determine_behavior')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <div className={classes.head_exposure}>
          <Typography className={commonClasses.title}>
            {t('pages/ai/reverse/index:exposure')}
          </Typography>
        </div>

        <ArcherElement
          id='derive'
          relations={[
            {
              targetId: 'apply',
              targetAnchor: 'right',
              sourceAnchor: 'left'
            }
          ]}
        >
          <div className={classes.derive}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/ai/reverse/index:derive_attack_vector')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <ArcherElement
          id='apply'
          relations={[
            {
              targetId: 'function',
              targetAnchor: 'bottom',
              sourceAnchor: 'top'
            }
          ]}
        >
          <div className={classes.apply}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/ai/reverse/index:apply_attack_vector')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};
