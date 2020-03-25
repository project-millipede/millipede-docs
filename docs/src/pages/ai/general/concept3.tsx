import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

import { useTranslation } from '../../../../../i18n';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
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
  const classes = useStyles({});

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
        {/* <div className={classes.rowRight}> */}
        <div className={classes.rowMiddle}>
          <ArcherElement
            id='render'
            relations={[
              {
                targetId: 'coordination',
                // targetAnchor: 'right',
                targetAnchor: 'top',
                sourceAnchor: 'bottom',

                // targetId: 'react_observe',
                // targetAnchor: 'top',
                // sourceAnchor: 'bottom',

                label: (
                  <div
                  // style={{ marginTop: '-20px' }}
                  >{`${t('react_observe')}`}</div>
                )
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

        {/* <div className={classes.boxWrapper}> */}
        {/* <Typography variant='subtitle1' className={classes.title}>
          {t('target_application')}
        </Typography> */}

        <div className={classes.rowMiddle}>
          {/* <div className={classes.row}> */}
          {/* <ArcherElement
            id='observe_react'
            relations={[
              {
                targetId: 'coordination',
                targetAnchor: 'left',
                sourceAnchor: 'right'
              }
            ]}
          >
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('observe_react')}`}
              </Typography>
            </div>
          </ArcherElement> */}

          <ArcherElement id='coordination'>
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('coordination')}`}
              </Typography>
            </Box>
          </ArcherElement>

          {/* <ArcherElement
            id='react_observe'
            relations={[
              {
                targetId: 'coordination',
                targetAnchor: 'right',
                sourceAnchor: 'left'
              }
            ]}
          >
            <div className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                {`${t('react_observe')}`}
              </Typography>
            </div>
          </ArcherElement> */}
        </div>
        {/* </div> */}

        {/* <div className={classes.row}>
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
      </div> */}

        {/* <div className={classes.rowLeft}> */}
        <div className={classes.rowMiddle}>
          <ArcherElement
            id='custom_render'
            relations={[
              {
                targetId: 'coordination',
                // targetAnchor: 'left',
                targetAnchor: 'bottom',
                sourceAnchor: 'top',

                // targetId: 'observe_react',
                // targetAnchor: 'bottom',
                // sourceAnchor: 'top',

                label: (
                  <div
                  // style={{ marginTop: '-20px' }}
                  >{`${t('observe_react')}`}</div>
                )
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
