import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { styled } from '@mui/material/styles';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { Title } from '../../../common';

const { ArcherElement } = Archer;

const { InteractiveBox } = Box;

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
        <InteractiveBox sx={{ gridArea: 'react_observe' }}>
          <Title>{`${t('pages/ai/general/index:react_observe')}`}</Title>
        </InteractiveBox>
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
        <InteractiveBox sx={{ gridArea: 'renderX' }}>
          <Title>{`${t('pages/ai/general/index:render_process')} ${t(
            'pages/ai/general/index:render_process_abbreviation'
          )}`}</Title>
        </InteractiveBox>
      </ArcherElement>

      <ArcherElement id='coordination'>
        <InteractiveBox sx={{ gridArea: 'coordination' }}>
          <Title>{`${t('pages/ai/general/index:coordination')}`}</Title>
        </InteractiveBox>
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
        <InteractiveBox sx={{ gridArea: 'custom_render' }}>
          <Title>
            {`${t('pages/ai/general/index:custom_render_process')} ${t(
              'pages/ai/general/index:custom_render_process_abbreviation'
            )}`}
          </Title>
        </InteractiveBox>
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
        <InteractiveBox sx={{ gridArea: 'observe_react' }}>
          <Title>{`${t('pages/ai/general/index:observe_react')}`}</Title>
        </InteractiveBox>
      </ArcherElement>
    </GridWrapper>
  );
};
