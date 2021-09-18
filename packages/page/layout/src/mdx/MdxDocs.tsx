import { DocsThemeProvider } from '@app/layout';
import { TOC_TOP } from '@app/layout/src/recoil/features/layout/reducer';
import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Components as ComponentUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Snackbar } from '@page/components';
import { Toc } from '@stefanprobst/remark-extract-toc';
import React, { FC, ReactNode } from 'react';

import { AppTableOfContents } from '../components';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';

const { SmoothScroll } = ComponentUtils;
export interface MarkdownDocsProps {
  disableToc: boolean;
  slug: Array<string>;
  toc: Toc;
  navigation: NavigationState;
  metaData: PageTypes.MetaData;
  children: ReactNode;
}

export const StyledAppContainer = styled(Container)(({ theme }) => {
  return {
    gridArea: 'middle',
    marginTop: theme.spacing(TOC_TOP)
  };
});

export const MdxDocs: FC<MarkdownDocsProps> = ({
  slug,
  toc,
  navigation,
  metaData,
  children
}) => {
  return (
    <>
      <StyledAppContainer>
        <AppContentHeader
          slug={slug}
          navigation={navigation}
          metaData={metaData}
        />
        <SmoothScroll>
          <DocsThemeProvider>{children}</DocsThemeProvider>
        </SmoothScroll>
        <AppContentFooter navigation={navigation} />
      </StyledAppContainer>
      <AppTableOfContents toc={toc} sx={{ gridArea: 'right' }} />
      <Snackbar />
    </>
  );
};
