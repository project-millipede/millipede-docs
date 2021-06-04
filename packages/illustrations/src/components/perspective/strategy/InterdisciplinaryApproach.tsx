import { Archer } from '@app/components';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { useCommonStyles } from '../../../styles/CommonStyles';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: 'grid',
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateAreas: `
      '. individual data'
      'general realistic specific'
      '. society .'
      `,
      gridGap: '100px',
      [theme.breakpoints.down('sm')]: {
        gridGap: '25px'
      }
    },
    individual: {
      gridArea: 'individual'
    },
    data: {
      gridArea: 'data'
    },
    general: {
      gridArea: 'general'
    },
    realistic: {
      gridArea: 'realistic'
    },
    specific: {
      gridArea: 'specific'
    },
    society: {
      gridArea: 'society'
    }
  })
);

export const InterdisciplinaryApproach: FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.grid}>
        <ArcherElement
          id='individual'
          relations={[
            {
              targetId: 'data',
              targetAnchor: 'left',
              sourceAnchor: 'right'
            }
          ]}
        >
          <div className={classes.individual}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/perspective/index:individual')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
        <ArcherElement id='data'>
          <div className={classes.data}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/perspective/index:dataCentric')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
        <ArcherElement
          id='general'
          relations={[
            {
              targetId: 'individual',
              targetAnchor: 'left',
              sourceAnchor: 'top',
              style: { strokeDasharray: '5,5' }
            },
            {
              targetId: 'society',
              targetAnchor: 'left',
              sourceAnchor: 'bottom',
              style: { strokeDasharray: '5,5' }
            }
          ]}
        >
          <div className={classes.general}>
            <CustomBox bgcolor='#F44336' routeSegement='general'>
              <Typography className={commonClasses.title}>
                {`${t('pages/perspective/index:general')} ${t(
                  'pages/perspective/index:problemSolving'
                )}`}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <ArcherElement
          id='realistic'
          relations={[
            {
              targetId: 'individual',
              targetAnchor: 'bottom',
              sourceAnchor: 'top'
            },
            {
              targetId: 'society',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <div className={classes.realistic}>
            <CustomBox bgcolor='#4CAF50' routeSegement='realistic'>
              <Typography className={commonClasses.title}>
                {`${t('pages/perspective/index:realistic')} ${t(
                  'pages/perspective/index:problemSolving'
                )}`}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>

        <ArcherElement
          id='specific'
          relations={[
            {
              targetId: 'data',
              targetAnchor: 'bottom',
              sourceAnchor: 'top'
            }
          ]}
        >
          <div className={classes.specific}>
            <CustomBox bgcolor='#FFEB3B' routeSegement='specific'>
              <Typography className={commonClasses.title}>
                {`${t('pages/perspective/index:specific')} ${t(
                  'pages/perspective/index:problemSolving'
                )}`}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
        <ArcherElement id='society'>
          <div className={classes.society}>
            <CustomBox>
              <Typography className={commonClasses.title}>
                {t('pages/perspective/index:society')}
              </Typography>
            </CustomBox>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};
