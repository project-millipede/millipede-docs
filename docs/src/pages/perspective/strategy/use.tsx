/* eslint-disable import/no-named-as-default */
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Hyphenated from 'react-hyphen';

import { useTranslation } from '../../../../../i18n';
import { ArcherContainer, ArcherElement } from '../../../modules/components/archer';
import CustomBox from '../../../modules/components/archer/CustomBoxForward';

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
      maxWidth: '100px'
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold'
    },
    boxHover: {
      cursor: 'pointer',
      padding: '10px',
      border: '3px solid black',
      maxWidth: '100px',
      backgroundColor: '#888888'
    }
  })
);

const ns = 'pages/perspective/index';

const Diagram = () => {
  const classes = useStyles();

  const { t } = useTranslation(ns);

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className='center-flex__1-of-2'>
        <div>
          <ArcherElement
            id='individual'
            relations={[
              {
                targetId: 'data',
                targetAnchor: 'left',
                sourceAnchor: 'right'
              }
            ]}
          >
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                <Hyphenated>{t('individual')}</Hyphenated>
              </Typography>
            </Box>
          </ArcherElement>
        </div>
        <div>
          <ArcherElement id='data'>
            <Box className={classes.box}>
              <Typography variant='subtitle1' className={classes.title}>
                <Hyphenated>{t('dataCentric')}</Hyphenated>
              </Typography>
            </Box>
          </ArcherElement>
        </div>
      </div>

      <div className={classes.row}>
        <ArcherElement
          id='general'
          relations={[
            {
              targetId: 'individual',
              targetAnchor: 'left',
              sourceAnchor: 'top',
              style: { strokeDasharray: '5,5' }
            },
            {
              targetId: 'society',
              targetAnchor: 'left',
              sourceAnchor: 'bottom',
              style: { strokeDasharray: '5,5' }
            }
          ]}
        >
          <CustomBox id='general' bgcolor='error.main'>
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{`${t('general')} ${t(
                'problemSolving'
              )}`}</Hyphenated>
            </Typography>
          </CustomBox>
        </ArcherElement>

        <ArcherElement
          id='realistic'
          relations={[
            {
              targetId: 'individual',
              targetAnchor: 'bottom',
              sourceAnchor: 'top'
            },
            {
              targetId: 'society',
              targetAnchor: 'top',
              sourceAnchor: 'bottom'
            }
          ]}
        >
          <CustomBox id='realistic' bgcolor='success.main'>
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{`${t('realistic')} ${t(
                'problemSolving'
              )}`}</Hyphenated>
            </Typography>
          </CustomBox>
        </ArcherElement>

        <ArcherElement
          id='specific'
          relations={[
            {
              targetId: 'data',
              targetAnchor: 'bottom',
              sourceAnchor: 'top'
            }
          ]}
        >
          <CustomBox id='specific' bgcolor='warning.main'>
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{`${t('specific')} ${t(
                'problemSolving'
              )}`}</Hyphenated>
            </Typography>
          </CustomBox>
        </ArcherElement>
      </div>
      <div className={classes.singleElement}>
        <ArcherElement id='society'>
          <Box className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{t('society')}</Hyphenated>
            </Typography>
          </Box>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};

export default Diagram;
