import { APP_CONTENT_HEADER_HEIGHT, TOC_TOP } from '@app/layout';
import { I18n } from '@app/utils';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TocEntry } from '@stefanprobst/remark-extract-toc';
import { FC } from 'react';

import { TocComponent } from './toc/TocComponent';

interface AppTableOfContentsProps {
  toc: Array<
    Omit<TocEntry, 'children'> & {
      isParent?: boolean;
    }
  >;
  className: string;
}

// Use when app-frame display='grid'
const TocNav = styled('div')(({ theme }) => {
  return {
    position: 'sticky',
    top: theme.spacing(TOC_TOP),
    marginTop: theme.spacing(TOC_TOP),
    alignSelf: 'start', // important, required for stickiness in display=grid
    gridArea: 'app-right'

    /**
     * Note:
     * Required when a-toc is not wrapped in a media component,
     * respectively a classname gets not supplied to the toc-nav component.
     *
     * [theme.breakpoints.down('md')]: {
     *    display: 'none'
     * }
     */
  };
});

export const TocHeaderContainer = styled('div')(({ theme }) => ({
  height: theme.spacing(APP_CONTENT_HEADER_HEIGHT),
  display: 'flex',
  alignItems: 'center'
}));

export const TocHeader = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: theme.typography.fontWeightMedium
}));

export const AppTableOfContents: FC<AppTableOfContentsProps> = ({
  toc = [],
  className
}) => {
  const { t } = I18n.useTranslation();

  const label = t(
    'common:toc',
    {},
    {
      fallback: 'Contents'
    }
  );

  return (
    <TocNav className={className}>
      <TocHeaderContainer>
        <TocHeader>{label}</TocHeader>
      </TocHeaderContainer>
      <TocComponent toc={toc} />
    </TocNav>
  );
};
