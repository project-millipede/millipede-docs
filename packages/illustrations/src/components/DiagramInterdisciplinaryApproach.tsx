/* eslint-disable import/no-named-as-default */
import { Archer } from '@app/components';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import Hyphenated from 'react-hyphen';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

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
      backgroundColor: '#E0E0E0'
    }
  })
);

export const DiagramInterdisciplinaryApproach: FC = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  // const { pathname } = useRouter();

  // console.log('pathname: ', pathname);

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
            <CustomBox>
              {/* <Box className={classes.box}> */}
              <Typography variant='subtitle1' className={classes.title}>
                <Hyphenated>{t('individual')}</Hyphenated>
              </Typography>
              {/* </Box> */}
            </CustomBox>
          </ArcherElement>
        </div>
        <div>
          <ArcherElement id='data'>
            <CustomBox>
              {/* <Box className={classes.box}> */}
              <Typography variant='subtitle1' className={classes.title}>
                <Hyphenated>
                  {t('pages/perspective/index:dataCentric')}
                </Hyphenated>
              </Typography>
              {/* </Box> */}
            </CustomBox>
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
          <CustomBox bgcolor='#F44336' routeSegement='general'>
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{`${t('pages/perspective/index:general')} ${t(
                'pages/perspective/index:problemSolving'
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
          <CustomBox bgcolor='#4CAF50' routeSegement='realistic'>
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{`${t('pages/perspective/index:realistic')} ${t(
                'pages/perspective/index:problemSolving'
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
          <CustomBox bgcolor='#FFEB3B' routeSegement='specific'>
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{`${t('pages/perspective/index:specific')} ${t(
                'pages/perspective/index:problemSolving'
              )}`}</Hyphenated>
            </Typography>
          </CustomBox>
        </ArcherElement>
      </div>
      <div className={classes.singleElement}>
        <ArcherElement id='society'>
          <CustomBox>
            {/* <Box className={classes.box}> */}
            <Typography variant='subtitle1' className={classes.title}>
              <Hyphenated>{t('pages/perspective/index:society')}</Hyphenated>
            </Typography>
            {/* </Box> */}
          </CustomBox>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};
