import { Archer } from '@app/components';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

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

const Diagram = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Archer.ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.row}>
        <Archer.ArcherElement id='misinformation'>
          <Box className={classes.box} sx={{ bgcolor: 'error.main' }}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:misinformation')}`}
            </Typography>
          </Box>
        </Archer.ArcherElement>
        <Archer.ArcherElement
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
          <Box className={classes.box} sx={{ bgcolor: 'success.main' }}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:disinformation')}`}
            </Typography>
          </Box>
        </Archer.ArcherElement>

        <Archer.ArcherElement id='malinformation'>
          <Box className={classes.box} sx={{ bgcolor: 'warning.main' }}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:malinformation')}`}
            </Typography>
          </Box>
        </Archer.ArcherElement>
      </div>
    </Archer.ArcherContainer>
  );
};

export default Diagram;
