import { Archer } from '@app/components';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

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

const Diagram = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Archer.ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.boxWrapper}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('pages/ai/general/index:target_application')}
        </Typography>
        <div className={classes.row}>
          <Archer.ArcherElement
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
                {`${t('pages/ai/general/index:communication_process')} ${t(
                  'pages/ai/general/index:communication_process_abbreviation'
                )}`}
              </Typography>
            </div>
          </Archer.ArcherElement>
          <Archer.ArcherElement
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
                {`${t('pages/ai/general/index:preparation_process')} ${t(
                  'pages/ai/general/index:preparation_process_abbreviation'
                )}`}
              </Typography>
            </Box>
          </Archer.ArcherElement>
        </div>
      </div>

      <div className={classes.boxWrapper}>
        <Typography variant='subtitle1' className={classes.title}>
          {t('pages/ai/general/index:dedicated_render_process')}
        </Typography>

        <div className={classes.row}>
          <Archer.ArcherElement
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
                {`${t('pages/ai/general/index:react_observe')}`}
              </Typography>
            </div>
          </Archer.ArcherElement>

          <Archer.ArcherElement
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
                {`${t('pages/ai/general/index:render_process')} ${t(
                  'pages/ai/general/index:render_process_abbreviation'
                )}`}
              </Typography>
            </div>
          </Archer.ArcherElement>
        </div>

        <div className={classes.rowMiddle}>
          <Archer.ArcherElement id='coordination'>
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('pages/ai/general/index:coordination')}`}
              </Typography>
            </Box>
          </Archer.ArcherElement>
        </div>

        <div className={classes.row}>
          <Archer.ArcherElement
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
                {`${t('pages/ai/general/index:custom_render_process')} ${t(
                  'custom_render_process_abbreviation'
                )}`}
              </Typography>
            </div>
          </Archer.ArcherElement>

          <Archer.ArcherElement
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
                {`${t('pages/ai/general/index:observe_react')}`}
              </Typography>
            </div>
          </Archer.ArcherElement>
        </div>
      </div>

      <div className={classes.boxWrapper}>
        <div className={classes.row}>
          <Archer.ArcherElement
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
                {`${t('pages/ai/general/index:preparation_process_custom')} ${t(
                  'pages/ai/general/index:preparation_process_custom_abbreviation'
                )}`}
              </Typography>
            </Box>
          </Archer.ArcherElement>
          <Archer.ArcherElement
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
                {`${t(
                  'pages/ai/general/index:communication_process_custom'
                )} ${t(
                  'pages/ai/general/index:communication_process_custom_abbreviation'
                )}`}
              </Typography>
            </div>
          </Archer.ArcherElement>
        </div>
        <Typography variant='subtitle1' className={classes.title}>
          {t('pages/ai/general/index:project_millipede')}
        </Typography>
      </div>
    </Archer.ArcherContainer>
  );
};

export default Diagram;
