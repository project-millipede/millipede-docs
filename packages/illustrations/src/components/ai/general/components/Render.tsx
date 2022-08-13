import { Archer } from '@app/archer';
import { Box } from '@app/components';
import { I18n } from '@app/utils';
import { styled } from '@mui/material/styles';
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
    '. react_observe . render_process .'
    '. . coordination . .'
    '. custom_render . observe_react .'
    '. . . . .'
    `,
    rowGap: theme.spacing(3),
    border: '3px solid black'
  };
});

export const Render: FC = () => {
  const { t } = I18n.useTranslation('pages/ai/general/index');

  return (
    <GridWrapper>
      <div style={{ gridArea: 'head_render' }}>
        <Title>{t('dedicated_render_process')}</Title>
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
          <Title>{`${t('react_observe')}`}</Title>
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
        <InteractiveBox sx={{ gridArea: 'render_process' }}>
          <Title>{`${t('render_process')} ${t(
            'render_process_abbreviation'
          )}`}</Title>
        </InteractiveBox>
      </ArcherElement>

      <ArcherElement id='coordination'>
        <InteractiveBox sx={{ gridArea: 'coordination' }}>
          <Title>{`${t('coordination')}`}</Title>
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
            {`${t('custom_render_process')} ${t(
              'custom_render_process_abbreviation'
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
          <Title>{`${t('observe_react')}`}</Title>
        </InteractiveBox>
      </ArcherElement>
    </GridWrapper>
  );
};
