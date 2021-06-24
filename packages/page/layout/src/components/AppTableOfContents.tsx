import { TOC_TOP, TOC_WIDTH } from '@app/layout/src/recoil/features/layout/reducer';
import { Container, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { TocComponent } from './toc';

export interface AppTableOfContentsProps {
  content: string;
}

export const AppTableOfContents: FC<AppTableOfContentsProps> = ({
  content
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container
      component='nav'
      sx={{
        position: 'sticky',
        width: TOC_WIDTH,
        height: `calc(100% - ${TOC_TOP}px)`,
        top: TOC_TOP,
        order: 2,
        flexShrink: 0,
        margin: theme.spacing(1),
        overflowY: 'auto',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block'
        },
        '& ul': {
          paddingLeft: 0,
          listStyle: 'none'
        }
      }}
    >
      <Typography
        sx={{
          height: 56,
          padding: theme.spacing(1),
          fontSize: 16,
          fontWeight: theme.typography.fontWeightMedium
        }}
      >
        {t('common:toc')}
      </Typography>
      <TocComponent content={content} />
    </Container>
  );
};
