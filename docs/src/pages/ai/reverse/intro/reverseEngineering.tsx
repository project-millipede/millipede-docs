import { Box, Typography } from '@material-ui/core';
import { createStyles, lighten, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { useTranslation } from '../../../../../../i18n';
import { ArcherContainer, ArcherElement } from '../../../../modules/components/archer';

const useStyles = makeStyles(() =>
  createStyles({
    rowRight: {
      margin: '50px 0',
      display: 'flex',
      flexDirection: 'row-reverse'
    },
    row: {
      margin: '50px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    box: {
      padding: '10px',
      border: '3px solid black',
      width: '120px'
    },

    boxNoBorder: {
      padding: '10px',
      border: '3px solid black',
      width: '120px'
    },

    boxWrapper: {
      padding: '10px',
      border: '3px solid black',
      margin: '50px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },

    boxInner: {
      margin: '50px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },

    boxWrapper2: {
      padding: '10px',
      border: '3px solid black',
      margin: '50px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    container: {
      backgroundColor: lighten('#000000', 0.95)
    },

    title: {
      textAlign: 'center',
      fontWeight: 'bold'
    }
  })
);

const ns = 'pages/ai/general/index';

const AnalyseAndImplant = () => {
  const classes = useStyles();

  const { t } = useTranslation(ns);

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <Box className={classes.boxWrapper2}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('program')}
        </Typography>

        <div className={classes.boxInner}>
          <ArcherElement id='function'>
            <Box className={classes.box} style={{ height: '100%' }}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('Function')}
              </Typography>
            </Box>
          </ArcherElement>
          <ArcherElement
            id='instruction_1'
            relations={[
              {
                targetId: 'function',
                targetAnchor: 'right',
                sourceAnchor: 'left'
              },
              {
                targetId: 'agent3',
                targetAnchor: 'top',
                sourceAnchor: 'bottom'
              }
            ]}
          >
            <Box className={classes.boxNoBorder}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('Instrument function')}
              </Typography>
            </Box>
          </ArcherElement>
        </div>
      </Box>

      <Box className={classes.boxWrapper2}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('Analysis')}
        </Typography>
        <div className={classes.rowRight}>
          <ArcherElement
            id='agent3'
            relations={[
              {
                targetId: 'agent4',
                targetAnchor: 'top',
                sourceAnchor: 'bottom'
              }
            ]}
          >
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('Determine behavior')}
              </Typography>
            </Box>
          </ArcherElement>
        </div>
      </Box>

      <Box className={classes.boxWrapper2}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('Exposure')}
        </Typography>
        <div className={classes.boxInner}>
          <ArcherElement
            id='agent5'
            relations={[
              {
                targetId: 'function',
                targetAnchor: 'bottom',
                sourceAnchor: 'top'
              }
            ]}
          >
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('Apply attack vector')}
              </Typography>
            </Box>
          </ArcherElement>
          <ArcherElement
            id='agent4'
            relations={[
              {
                targetId: 'agent5',
                targetAnchor: 'right',
                sourceAnchor: 'left'
              }
            ]}
          >
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('Derive attack vector')}
              </Typography>
            </Box>
          </ArcherElement>
        </div>
      </Box>
    </ArcherContainer>
  );
};

export default AnalyseAndImplant;
