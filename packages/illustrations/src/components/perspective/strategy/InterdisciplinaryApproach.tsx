import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { styled } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { Title } from '../../common';

const { ArcherSurface, ArcherElement } = Archer;

const { InteractiveBox } = Box;

export const GridWrapper = styled('div')(({ theme }) => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(3, 1fr)`,
    gridTemplateRows: `repeat(3, 1fr)`,
    gridTemplateAreas: `
    '. individual data'
    'general realistic specific'
    '. society .'
    `,
    rowGap: theme.spacing(3),
    columnGap: theme.spacing(3)
  };
});

export const InterdisciplinaryApproach: FC = () => {
  const { t } = useTranslation();

  return (
    <ArcherSurface strokeColor='gray'>
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
          <InteractiveBox sx={{ gridArea: 'individual' }}>
            <Title>{t('pages/perspective/strategy/index:individual')}</Title>
          </InteractiveBox>
        </ArcherElement>
        <ArcherElement id='data'>
          <InteractiveBox sx={{ gridArea: 'data' }}>
            <Title>{t('pages/perspective/strategy/index:dataCentric')}</Title>
          </InteractiveBox>
        </ArcherElement>
        <ArcherElement
          id='general'
          relations={[
            {
              targetId: 'individual',
              targetAnchor: 'left',
              sourceAnchor: 'top',
              style: { strokeDasharray: '5' }
            },
            {
              targetId: 'society',
              targetAnchor: 'left',
              sourceAnchor: 'bottom',
              style: { strokeDasharray: '5' }
            }
          ]}
        >
          <InteractiveBox
            sx={{
              gridArea: 'general',
              backgroundColor: '#F44336'
            }}
            routeSegement='general'
          >
            <Title>
              {`${t('pages/perspective/strategy/index:general')} ${t(
                'pages/perspective/strategy/index:problemSolving'
              )}`}
            </Title>
          </InteractiveBox>
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
          <InteractiveBox
            sx={{
              gridArea: 'realistic',
              backgroundColor: '#4CAF50'
            }}
            routeSegement='realistic'
          >
            <Title>
              {`${t('pages/perspective/strategy/index:realistic')} ${t(
                'pages/perspective/strategy/index:problemSolving'
              )}`}
            </Title>
          </InteractiveBox>
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
          <InteractiveBox
            sx={{
              gridArea: 'specific',
              backgroundColor: '#FFEB3B'
            }}
            routeSegement='specific'
          >
            <Title>
              {`${t('pages/perspective/strategy/index:specific')} ${t(
                'pages/perspective/strategy/index:problemSolving'
              )}`}
            </Title>
          </InteractiveBox>
        </ArcherElement>
        <ArcherElement id='society'>
          <InteractiveBox sx={{ gridArea: 'society' }}>
            <Title>{t('pages/perspective/strategy/index:society')}</Title>
          </InteractiveBox>
        </ArcherElement>
      </GridWrapper>
    </ArcherSurface>
  );
};
