import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { useTranslation } from '../../../../../i18n';
import { ArcherContainer, ArcherElement } from '../../../modules/components/archer';

const useStyles = makeStyles(() =>
  createStyles({
    // rowMiddle: {
    //   margin: '50px 0',
    //   display: 'flex',
    //   justifyContent: 'center'
    // },
    // row: {
    //   margin: '50px 0',
    //   display: 'flex',
    //   justifyContent: 'space-between'
    // },
    // box: {
    //   padding: '10px',
    //   border: '3px solid black',
    //   minWidth: '100px'
    // },
    // title: {
    //   textAlign: 'center',
    //   fontWeight: 'bold'
    // }

    rowMiddle: {
      margin: '50px 0',
      display: 'flex',
      justifyContent: 'center'
    },
    rowLeft: {
      margin: '50px 0',
      display: 'flex'
      // justifyContent: 'center'
    },
    rowRight: {
      margin: '50px 0',
      display: 'flex',
      // justifyContent: 'center'
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
      maxWidth: '150px'
    },

    boxWrapper: {
      padding: '10px',
      border: '3px solid black',
      margin: '50px 0'
    },

    title: {
      textAlign: 'center',
      fontWeight: 'bold'
    }
  })
);

const ns = 'pages/ai/general/index';

const Diagram = () => {
  const classes = useStyles();

  const { t } = useTranslation(ns);

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.boxWrapper}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('target_application')}
        </Typography>
        <div className={classes.row}>
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
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('communication_process')} ${t(
                  'communication_process_abbreviation'
                )}`}
              </Typography>
            </div>
          </ArcherElement>
          <ArcherElement
            id='preparation'
            relations={[
              {
                targetId: 'shared_render',
                targetAnchor: 'right',
                sourceAnchor: 'bottom'
              }
            ]}
          >
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('preparation_process')} ${t(
                  'preparation_process_abbreviation'
                )}`}
              </Typography>
            </Box>
          </ArcherElement>
        </div>
      </div>

      <div className={classes.rowMiddle}>
        <ArcherElement id='shared_render'>
          <Box className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('shared_render_process')} ${t(
                'shared_render_process_abbreviation'
              )}`}
            </Typography>
          </Box>
        </ArcherElement>
      </div>
      <div className={classes.boxWrapper}>
        <div className={classes.row}>
          <ArcherElement
            id='preparation_custom'
            relations={[
              {
                targetId: 'shared_render',
                targetAnchor: 'left',
                sourceAnchor: 'top'
              }
            ]}
          >
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('preparation_process_custom')} ${t(
                  'preparation_process_custom_abbreviation'
                )}`}
              </Typography>
            </Box>
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
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('communication_process_custom')} ${t(
                  'communication_process_custom_abbreviation'
                )}`}
              </Typography>
            </div>
          </ArcherElement>
        </div>
        <Typography variant='subtitle1' className={classes.title}>
          {t('project_millipede')}
        </Typography>
      </div>
    </ArcherContainer>
  );
};

export default Diagram;
