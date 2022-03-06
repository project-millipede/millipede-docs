import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { UrlObject } from 'url';

import { HiddenUnderlineLink } from '../link';

export type BoxEnhancedProps = BoxProps &
  Omit<LinkProps, 'href'> & { href?: UrlObject };

export const StyledBox = styled(Box)<BoxEnhancedProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  border: '1px solid black',
  [theme.breakpoints.up('md')]: {
    border: '2px solid black'
  },
  color: theme.palette.text.primary,
  ':hover': {
    cursor: 'pointer',
    backgroundColor: '#E0E0E0'
  }
}));

export type InteractiveBoxProps = BoxProps & {
  routeSegement?: string;
};

const InteractiveBox: ForwardRefRenderFunction<
  HTMLDivElement,
  InteractiveBoxProps
> = ({ sx, routeSegement, children }, ref) => {
  const { pathname, query } = useRouter();

  return routeSegement ? (
    <StyledBox
      sx={sx}
      ref={ref}
      component={HiddenUnderlineLink}
      href={{
        pathname,
        query,
        hash: `${routeSegement}-anchor`
      }}
      shallow
      prefetch={false}
    >
      {children}
    </StyledBox>
  ) : (
    <StyledBox sx={sx} ref={ref}>
      {children}
    </StyledBox>
  );
};

export default forwardRef(InteractiveBox);
