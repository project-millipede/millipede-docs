import { HiddenUnderlineLink, LinkProps } from '@app/components';
import { Typography, TypographyProps } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ParsedUrlQuery } from 'querystring';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { scrollItemsState } from '../../recoil/features/scroll/page/reducer';

const processLink = (activeState: { [key: string]: string }, href: string) => {
  return (
    Object.keys(activeState).filter(
      activeState => activeState === decodeURI(href).replace('#', '')
    ).length > 0
  );
};

type TypographyEnhancedProps = TypographyProps &
  LinkProps & {
    isActive: boolean;

    // Note:
    // The types for the (styled) typography component are broken- type-inference is not working as expected.
    // Specifying the component property on styled typography is not possible; the property does not exist.
    // The utilization of the component property works, e.g., on a styled box component as expected.
    component?: React.ElementType;
  };

const TocLabel = styled(Typography, {
  shouldForwardProp: prop => prop !== 'isActive'
})<TypographyEnhancedProps>(({ theme, isActive }) => {
  return {
    display: 'block',
    fontSize: '0.875rem',
    margin: theme.spacing(1, 0),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary,
    borderLeft: isActive
      ? `2px solid ${theme.palette.grey[300]}`
      : `2px solid transparent`,
    '&:hover': {
      borderLeftColor: theme.palette.grey[200]
    }
  };
});

export interface TocLinkProps {
  href: string;
  query: ParsedUrlQuery;
  pathname: string;
}

export const TocLink: FC<TocLinkProps> = ({
  href,
  query,
  pathname,
  children
}) => {
  const { scrollItems } = useRecoilValue(scrollItemsState);
  const isActive = processLink(scrollItems, href);

  return (
    <TocLabel
      component={HiddenUnderlineLink}
      href={{
        pathname,
        query,
        hash: href
      }}
      shallow
      prefetch={false}
      isActive={isActive}
    >
      {children}
    </TocLabel>
  );
};
