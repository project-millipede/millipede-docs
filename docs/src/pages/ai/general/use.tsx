import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

import { useTranslation } from '../../../../../i18n';

const useStyles = makeStyles(() =>
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
      // maxWidth: '150px',
      width: '200px',
      height: '200px',
      borderRadius: '100px',
      display: 'flex'
    },
    title: {
      whiteSpace: 'pre-wrap',
      textAlign: 'center',
      fontWeight: 'bold',
      margin: 'auto'
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
        <ArcherElement id='misinformation'>
          <Box bgcolor='error.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('misinformation')}`}
            </Typography>
          </Box>
        </ArcherElement>
        <ArcherElement
          id='disinformation'
          relations={[
            {
              targetId: 'misinformation',
              targetAnchor: 'right',
              sourceAnchor: 'left'
            },
            {
              targetId: 'malinformation',
              targetAnchor: 'left',
              sourceAnchor: 'right'
            }
          ]}
        >
          <Box bgcolor='success.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('disinformation')}`}
            </Typography>
          </Box>
        </ArcherElement>

        <ArcherElement id='malinformation'>
          <Box bgcolor='warning.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('malinformation')}`}
            </Typography>
          </Box>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};

export default Diagram;
