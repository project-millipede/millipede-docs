import { HiddenUnderlineLink } from '@app/components';
import { Components as RenderComponents } from '@app/render-utils';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Components } from '@page/layout';
import { Toc } from '@stefanprobst/remark-extract-toc';
import { FC, ReactNode } from 'react';

import { AppFrameGrid } from './FrameGrid';
import { HideOnScroll } from './toolbar/HideOnScroll';

const {
  Media: { MediaConsumer },
  Suspense: { SuspenseWrapper }
} = RenderComponents;

export const StyledAppBar = styled(AppBar)({
  boxShadow: 'none',
  borderBottomStyle: 'solid',
  borderBottomWidth: 'thin',
  borderColor: grey[400],
  backgroundColor: grey[200]
});

interface BlogFrameProps {
  toc?: Toc;
}

export const BlogFrame: FC<
  BlogFrameProps & {
    children: ReactNode;
  }
> = ({ toc, children }) => {
  return (
    <>
      <HideOnScroll>
        <StyledAppBar>
          <Toolbar>
            <Typography
              component={HiddenUnderlineLink}
              variant='h3'
              sx={{
                fontWeight: 700,
                color: grey[800]
              }}
              href={{ pathname: `/blog` }}
              prefetch={false}
            >
              Untether
            </Typography>
          </Toolbar>
        </StyledAppBar>
      </HideOnScroll>

      <AppFrameGrid hasToc={!!toc} hasNavigation={false}>
        {children}

        {!!toc && (
          <MediaConsumer>
            {({ media: { desktop } }) => {
              const { className } = desktop;
              return (
                <SuspenseWrapper media={desktop}>
                  <Components.AppTableOfContents
                    toc={toc}
                    className={className}
                  />
                </SuspenseWrapper>
              );
            }}
          </MediaConsumer>
        )}
      </AppFrameGrid>
    </>
  );
};
