import { DocsThemeProvider, TOC_TOP } from '@app/layout';
import { Components as RenderComponents } from '@app/render-utils';
import { Navigation, PageTypes } from '@app/types';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Snackbar } from '@page/components';
import { Toc } from '@stefanprobst/remark-extract-toc';
import { FC } from 'react';

import { AppTableOfContents } from '../components';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';

const {
  Media: { Media }
} = RenderComponents;

export interface MarkdownDocsProps {
  slug: Array<string>;
  toc: Toc;
  navigation: Navigation;
  metaData: PageTypes.MetaData;
}

export const StyledAppContainer = styled(Container)(({ theme }) => {
  return {
    gridArea: 'app-center',
    marginTop: theme.spacing(TOC_TOP)
  };
}) as typeof Container;

export const MdxDocs: FC<MarkdownDocsProps> = ({
  slug,
  toc,
  navigation,
  metaData,
  children
}) => {
  return (
    <>
      <StyledAppContainer id='app-content' component='main'>
        <AppContentHeader
          slug={slug}
          navigation={navigation}
          metaData={metaData}
        />
        <DocsThemeProvider>{children}</DocsThemeProvider>
        <AppContentFooter navigation={navigation} />
      </StyledAppContainer>

      {toc && toc.length > 0 && (
        <Media greaterThanOrEqual='md'>
          {(className, renderChildren) => {
            return (
              <AppTableOfContents
                toc={toc}
                sx={{ gridArea: 'app-right' }}
                className={className}
                renderChildren={renderChildren}
              />
            );
          }}
        </Media>
      )}
      <Snackbar />
    </>
  );
};
