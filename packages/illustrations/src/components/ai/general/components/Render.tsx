import { Archer } from '@app/components';
import { styled } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { Title } from '../../../common';

const { CustomBox, ArcherElement } = Archer;

export const GridWrapper = styled('div')(({ theme }) => {
  const margin = theme.spacing(1);
  const heightHeading = theme.spacing(4);

  return {
    display: 'grid',
    gridArea: 'render',
    gridTemplateColumns: `${margin} repeat(3, 1fr) ${margin}`,
    gridTemplateRows: `${heightHeading} ${margin} repeat(3, 1fr) ${margin}`,
    gridTemplateAreas: `
    '. head_render head_render head_render .'
    '. . . . .'
    '. react_observe . renderX .'
    '. . coordination . .'
    '. custom_render . observe_react .'
    '. . . . .'
    `,
    rowGap: theme.spacing(3),
    border: '3px solid black'
  };
});

export const Render: FC = () => {
  const { t } = useTranslation();

  return (
    <GridWrapper>
      <div style={{ gridArea: 'head_render' }}>
        <Title>{t('pages/ai/general/index:dedicated_render_process')}</Title>
      </div>
      <ArcherElement
        id='react_observe'
        relations={[
          {
            targetId: 'coordination',
            targetAnchor: 'left',
            sourceAnchor: 'bottom'
          }
        ]}
      >
        <CustomBox sx={{ gridArea: 'react_observe' }}>
          <Title>{`${t('pages/ai/general/index:react_observe')}`}</Title>
        </CustomBox>
      </ArcherElement>

      <ArcherElement
        id='render'
        relations={[
          {
            targetId: 'react_observe',
            targetAnchor: 'right',
            sourceAnchor: 'left'
          }
        ]}
      >
        <CustomBox sx={{ gridArea: 'renderX' }}>
          <Title>{`${t('pages/ai/general/index:render_process')} ${t(
            'pages/ai/general/index:render_process_abbreviation'
          )}`}</Title>
        </CustomBox>
      </ArcherElement>

      <ArcherElement id='coordination'>
        <CustomBox sx={{ gridArea: 'coordination' }}>
          <Title>{`${t('pages/ai/general/index:coordination')}`}</Title>
        </CustomBox>
      </ArcherElement>

      <ArcherElement
        id='custom_render'
        relations={[
          {
            targetId: 'observe_react',
            targetAnchor: 'left',
            sourceAnchor: 'right'
          }
        ]}
      >
        <CustomBox sx={{ gridArea: 'custom_render' }}>
          <Title>
            {`${t('pages/ai/general/index:custom_render_process')} ${t(
              'pages/ai/general/index:custom_render_process_abbreviation'
            )}`}
          </Title>
        </CustomBox>
      </ArcherElement>

      <ArcherElement
        id='observe_react'
        relations={[
          {
            targetId: 'coordination',
            targetAnchor: 'right',
            sourceAnchor: 'top'
          }
        ]}
      >
        <CustomBox sx={{ gridArea: 'observe_react' }}>
          <Title>{`${t('pages/ai/general/index:observe_react')}`}</Title>
        </CustomBox>
      </ArcherElement>
    </GridWrapper>
  );
};
