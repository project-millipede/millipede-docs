import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { useTranslation } from '../../../../../i18n';
import { ArcherContainer, ArcherElement } from '../../../modules/components/archer';

const useStyles = makeStyles(() =>
  createStyles({
    rowMiddle: {
      margin: '50px 0',
      display: 'flex',
      justifyContent: 'center'
    },
    row: {
      margin: '50px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    boxWrapper: {
      padding: '10px',
      border: '3px solid black',
      margin: '50px 0'
    },
    box: {
      padding: '10px',
      border: '3px solid black',
      maxWidth: '150px'
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
                targetId: 'render',
                targetAnchor: 'top',
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

      <div className={classes.boxWrapper}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('dedicated_render_process')}
        </Typography>

        <div className={classes.row}>
          <ArcherElement
            id='react_observe'
            relations={[
              {
                targetId: 'coordination',
                targetAnchor: 'left',
                sourceAnchor: 'bottom'
              }
            ]}
          >
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('react_observe')}`}
              </Typography>
            </div>
          </ArcherElement>

          <ArcherElement
            id='render'
            relations={[
              {
                targetId: 'react_observe',
                targetAnchor: 'right',
                sourceAnchor: 'left'
              }
            ]}
          >
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('render_process')} ${t('render_process_abbreviation')}`}
              </Typography>
            </div>
          </ArcherElement>
        </div>

        <div className={classes.rowMiddle}>
          <ArcherElement id='coordination'>
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('coordination')}`}
              </Typography>
            </Box>
          </ArcherElement>
        </div>

        <div className={classes.row}>
          <ArcherElement
            id='custom_render'
            relations={[
              {
                targetId: 'observe_react',
                targetAnchor: 'left',
                sourceAnchor: 'right'
              }
            ]}
          >
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('custom_render_process')} ${t(
                  'custom_render_process_abbreviation'
                )}`}
              </Typography>
            </div>
          </ArcherElement>

          <ArcherElement
            id='observe_react'
            relations={[
              {
                targetId: 'coordination',
                targetAnchor: 'right',
                sourceAnchor: 'top'
              }
            ]}
          >
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('observe_react')}`}
              </Typography>
            </div>
          </ArcherElement>
        </div>
      </div>

      <div className={classes.boxWrapper}>
        <div className={classes.row}>
          <ArcherElement
            id='preparation_custom'
            relations={[
              {
                targetId: 'custom_render',
                targetAnchor: 'bottom',
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
