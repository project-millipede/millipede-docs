import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

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

const Diagram = () => {
  const classes = useStyles();

  const { t } = useTranslation();

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
              {`${t('pages/ai/general/index:communication_process')} ${t(
                'pages/ai/general/index:communication_process_abbreviation'
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
              {`${t('pages/ai/general/index:preparation_process')} ${t(
                'pages/ai/general/index:preparation_process_abbreviation'
              )}`}
            </Typography>
          </Box>
        </ArcherElement>
      </div>
      <div className={classes.row}>
        <ArcherElement id='render'>
          <div className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:render_process')} ${t(
                'pages/ai/general/index:render_process_abbreviation'
              )}`}
            </Typography>
          </div>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};

export default Diagram;
