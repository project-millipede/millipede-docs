import { HiddenUnderlineLink } from '@app/components';
import { Navigation } from '@app/types';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

import { AppFrameGrid } from './FrameGrid';
import { HideOnScroll } from './toolbar/HideOnScroll';

export const StyledAppBar = styled(AppBar)({
  boxShadow: 'none',
  borderBottomStyle: 'solid',
  borderBottomWidth: 'thin',
  borderColor: grey[400],
  backgroundColor: grey[200]
});

interface BlogFrameProps {
  hasToc?: boolean;
  navigation?: Navigation;
}

export const BlogFrame: FC<BlogFrameProps> = ({
  hasToc = false,
  navigation,
  children
}) => {
  return (
    <>
      <HideOnScroll>
        <StyledAppBar>
          <Toolbar>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 700,
                color: grey[800]
              }}
              component={HiddenUnderlineLink}
              href={{ pathname: `/blog` }}
              prefetch={false}
            >
              Untether
            </Typography>
          </Toolbar>
        </StyledAppBar>
      </HideOnScroll>

      <AppFrameGrid hasToc={hasToc} hasNavigation={!!navigation}>
        {children}
      </AppFrameGrid>
    </>
  );
};
