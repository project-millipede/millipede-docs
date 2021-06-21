import { Archer } from '@app/components';
import { styled } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { Title } from '../../common';

const { ArcherContainer, ArcherElement, CustomBox } = Archer;

export const GridWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateAreas: `
    '. individual data'
    'general realistic specific'
    '. society .'
    `,
  gridGap: theme.spacing(12),
  [theme.breakpoints.down('sm')]: {
    gridGap: theme.spacing(3)
  }
}));

export const InterdisciplinaryApproach: FC = () => {
  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <GridWrapper>
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
          <CustomBox sx={{ gridArea: 'individual' }}>
            <Title>{t('pages/perspective/index:individual')}</Title>
          </CustomBox>
        </ArcherElement>
        <ArcherElement id='data'>
          <CustomBox sx={{ gridArea: 'data' }}>
            <Title>{t('pages/perspective/index:dataCentric')}</Title>
          </CustomBox>
        </ArcherElement>
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
          <CustomBox
            sx={{ gridArea: 'general', bgcolor: '#F44336' }}
            routeSegement='general'
          >
            <Title>
              {`${t('pages/perspective/index:general')} ${t(
                'pages/perspective/index:problemSolving'
              )}`}
            </Title>
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
          <CustomBox
            sx={{ gridArea: 'realistic', bgcolor: '#4CAF50' }}
            routeSegement='realistic'
          >
            <Title>
              {`${t('pages/perspective/index:realistic')} ${t(
                'pages/perspective/index:problemSolving'
              )}`}
            </Title>
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
          <CustomBox
            sx={{ gridArea: 'specific', bgcolor: '#FFEB3B' }}
            routeSegement='specific'
          >
            <Title>
              {`${t('pages/perspective/index:specific')} ${t(
                'pages/perspective/index:problemSolving'
              )}`}
            </Title>
          </CustomBox>
        </ArcherElement>
        <ArcherElement id='society'>
          <CustomBox sx={{ gridArea: 'society' }}>
            <Title>{t('pages/perspective/index:society')}</Title>
          </CustomBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherContainer>
  );
};
