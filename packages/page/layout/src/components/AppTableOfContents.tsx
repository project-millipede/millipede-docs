import { APP_CONTENT_HEADER_HEIGHT, TOC_TOP } from '@app/layout';
import { Typography } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { TocEntry } from '@stefanprobst/remark-extract-toc';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { TocComponent } from './toc/TocComponent';

interface AppTableOfContentsProps {
  toc: Array<
    Omit<TocEntry, 'children'> & {
      isParent?: boolean;
    }
  >;
  sx?: SxProps<Theme>;
  className?: string;
  renderChildren?: boolean;
}

// Use when app-frame display='grid'
const TocNav = styled('div')(({ theme }) => {
  return {
    position: 'sticky',
    top: theme.spacing(TOC_TOP),
    alignSelf: 'start' // important, required for stickiness in display=grid

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
  sx,
  className,
  renderChildren
}) => {
  const { t } = useTranslation();

  const label = t(
    'common:toc',
    {},
    {
      fallback: 'Contents'
    }
  );

  return (
    <TocNav
      sx={sx}
      className={className}
      suppressHydrationWarning={!renderChildren}
    >
      {renderChildren && (
        <>
          <TocHeaderContainer>
            <TocHeader>{label}</TocHeader>
          </TocHeaderContainer>
          <TocComponent toc={toc} />
        </>
      )}
    </TocNav>
  );
};
