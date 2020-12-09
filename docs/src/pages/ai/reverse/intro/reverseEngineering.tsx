import { Archer } from '@app/components';
import { Box, Typography } from '@material-ui/core';
import { createStyles, lighten, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

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

const AnalyseAndImplant = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Archer.ArcherContainer noCurves strokeColor='gray'>
      <Box className={classes.boxWrapper2}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('pages/ai/general/index:program')}
        </Typography>

        <div className={classes.boxInner}>
          <Archer.ArcherElement id='function'>
            <Box className={classes.box} style={{ height: '100%' }}>
              <Typography variant='subtitle1' className={classes.title}>
                {t('pages/ai/general/index:function')}
              </Typography>
            </Box>
          </Archer.ArcherElement>
          <Archer.ArcherElement
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
                {t('pages/ai/general/index:instrument_function')}
              </Typography>
            </Box>
          </Archer.ArcherElement>
        </div>
      </Box>

      <Box className={classes.boxWrapper2}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('pages/ai/general/index:analysis')}
        </Typography>
        <div className={classes.rowRight}>
          <Archer.ArcherElement
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
                {t('pages/ai/general/index:determine_behavior')}
              </Typography>
            </Box>
          </Archer.ArcherElement>
        </div>
      </Box>

      <Box className={classes.boxWrapper2}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('pages/ai/general/index:exposure')}
        </Typography>
        <div className={classes.boxInner}>
          <Archer.ArcherElement
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
                {t('pages/ai/general/index:apply_attack_vector')}
              </Typography>
            </Box>
          </Archer.ArcherElement>
          <Archer.ArcherElement
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
                {t('pages/ai/general/index:derive_attack_vector')}
              </Typography>
            </Box>
          </Archer.ArcherElement>
        </div>
      </Box>
    </Archer.ArcherContainer>
  );
};

export default AnalyseAndImplant;
