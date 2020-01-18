import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

import { useTranslation } from '../../../../../i18n';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    singleElement: {
      display: 'flex',
      justifyContent: 'center'
    },
    row: {
      margin: '100px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    box: {
      padding: '10px',
      border: '3px solid black',
      maxWidth: '100px'
    },
    title: {
      whiteSpace: 'pre-wrap',
      textAlign: 'center',
      fontWeight: 'bold'
    }
  })
);

const ns = 'pages/perspective/index';

const Diagram = () => {
  const classes = useStyles({});

  const { t } = useTranslation(ns);

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className='center-flex__1-of-2'>
        <div>
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
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('individual')}
              </Typography>
            </Box>
          </ArcherElement>
        </div>
        <div>
          <ArcherElement id='data'>
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('dataCentric')}
              </Typography>
            </Box>
          </ArcherElement>
        </div>
      </div>

      <div className={classes.row}>
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
          <Box bgcolor='error.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('general')} ${t('problemSolving')}`}
            </Typography>
          </Box>
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
          <Box bgcolor='success.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('realistic')} ${t('problemSolving')}`}
            </Typography>
          </Box>
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
          <Box bgcolor='warning.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('specific')} ${t('problemSolving')}`}
            </Typography>
          </Box>
        </ArcherElement>
      </div>
      <div className={classes.singleElement}>
        <ArcherElement id='society'>
          <div className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {t('society')}
            </Typography>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};

export default Diagram;
