import { Archer } from '@app/components';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

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

export const Concept2: FC = () => {
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
                targetId: 'shared_render',
                targetAnchor: 'right',
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

      <div className={classes.rowMiddle}>
        <Archer.ArcherElement id='shared_render'>
          <Box className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:shared_render_process')} ${t(
                'pages/ai/general/index:shared_render_process_abbreviation'
              )}`}
            </Typography>
          </Box>
        </Archer.ArcherElement>
      </div>
      <div className={classes.boxWrapper}>
        <div className={classes.row}>
          <Archer.ArcherElement
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
