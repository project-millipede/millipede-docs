import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { useTranslation } from '../../../../../i18n';
import { ArcherContainer, ArcherElement } from '../../../modules/components/archer';

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      margin: '100px 0',
      display: 'flex',
      justifyContent: 'center'
    },
    box: {
      padding: '10px',
      border: '3px solid black',
      // minWidth: '100px',
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
      <div className={classes.row}>
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
          <div className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('communication_process')} ${t(
                'communication_process_abbreviation'
              )}`}
            </Typography>
          </div>
        </ArcherElement>
      </div>
      <div className={classes.row}>
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
      <div className={classes.row}>
        <ArcherElement id='render'>
          <div className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('render_process')} ${t('render_process_abbreviation')}`}
            </Typography>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};

export default Diagram;
