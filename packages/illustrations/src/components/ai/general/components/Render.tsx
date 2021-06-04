import { Archer } from '@app/components';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { useCommonStyles } from '../../../../styles/CommonStyles';

const { CustomBox, ArcherElement } = Archer;

const margin = '8px';
const heightHeading = '32px';

export const useRenderStyles = makeStyles(() =>
  createStyles({
    render: {
      gridArea: 'render',
      display: 'grid',
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
      rowGap: '25px',
      border: '3px solid black'
    },
    head_render: {
      gridArea: 'head_render'
    },
    react_observe: {
      gridArea: 'react_observe'
    },
    renderX: {
      gridArea: 'renderX'
    },
    coordination: {
      gridArea: 'coordination'
    },
    custom_render: {
      gridArea: 'custom_render'
    },
    observe_react: {
      gridArea: 'observe_react'
    }
  })
);

export const Render: FC = () => {
  const classes = useRenderStyles();
  const commonClasses = useCommonStyles();

  const { t } = useTranslation();

  return (
    <div className={classes.render}>
      <div className={classes.head_render}>
        <Typography className={commonClasses.title}>
          {t('pages/ai/general/index:dedicated_render_process')}
        </Typography>
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
        <div className={classes.react_observe}>
          <CustomBox>
            <Typography className={commonClasses.title}>
              {`${t('pages/ai/general/index:react_observe')}`}
            </Typography>
          </CustomBox>
        </div>
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
        <div className={classes.renderX}>
          <CustomBox>
            <Typography className={commonClasses.title}>
              {`${t('pages/ai/general/index:render_process')} ${t(
                'pages/ai/general/index:render_process_abbreviation'
              )}`}
            </Typography>
          </CustomBox>
        </div>
      </ArcherElement>

      <ArcherElement id='coordination'>
        <div className={classes.coordination}>
          <CustomBox>
            <Typography className={commonClasses.title}>
              {`${t('pages/ai/general/index:coordination')}`}
            </Typography>
          </CustomBox>
        </div>
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
        <div className={classes.custom_render}>
          <CustomBox>
            <Typography className={commonClasses.title}>
              {`${t('pages/ai/general/index:custom_render_process')} ${t(
                'pages/ai/general/index:custom_render_process_abbreviation'
              )}`}
            </Typography>
          </CustomBox>
        </div>
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
        <div className={classes.observe_react}>
          <CustomBox>
            <Typography className={commonClasses.title}>
              {`${t('pages/ai/general/index:observe_react')}`}
            </Typography>
          </CustomBox>
        </div>
      </ArcherElement>
    </div>
  );
};
