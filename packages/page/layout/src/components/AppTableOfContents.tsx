import {
  APP_CONTENT_HEADER_HEIGHT,
  TOC_TOP
} from '@app/layout/src/recoil/features/layout/reducer';
import { Typography } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import { TocEntry } from '@stefanprobst/remark-extract-toc';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { TocComponent } from './toc/TocComponent';

interface AppTableOfContentsProps {
  toc: Array<
    Omit<TocEntry, 'children'> & {
      isParent?: boolean;
    }
  >;
  sx?: SxProps<Theme>;
}

// Use when app-frame display='grid'
const TocNav = styled('div')(({ theme }) => {
  return {
    position: 'sticky',
    top: theme.spacing(TOC_TOP),
    alignSelf: 'start', // important, required for stickiness in display=grid
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  };
});

// Use when app-frame display='flex'
// const TocNav = styled('div')(({ theme }) => {
//   return {
//     position: 'sticky',
//     flex: `0 0 ${theme.spacing(TOC_WIDTH)}`,
//     top: theme.spacing(TOC_TOP),
//     alignSelf: 'flex-start', // required for stickiness in display=flex
//     [theme.breakpoints.down('md')]: {
//       display: 'none'
//     }
//   };
// });

const TocHeaderContainer = styled('div')(({ theme }) => ({
  height: theme.spacing(APP_CONTENT_HEADER_HEIGHT),
  display: 'flex',
  alignItems: 'center'
}));

const TocHeader = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: theme.typography.fontWeightMedium
}));

export const AppTableOfContents: FC<AppTableOfContentsProps> = ({
  toc = [],
  sx
}) => {
  const { t } = useTranslation();
  return (
    <TocNav sx={sx}>
      <TocHeaderContainer>
        <TocHeader>{t('common:toc')}</TocHeader>
      </TocHeaderContainer>
      <TocComponent toc={toc} />
    </TocNav>
  );
};
