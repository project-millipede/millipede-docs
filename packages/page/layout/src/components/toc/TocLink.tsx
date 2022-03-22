import { HiddenUnderlineLink } from '@app/components';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LinkProps } from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { ElementType, FC } from 'react';
import { useRecoilValue } from 'recoil';

import { features } from '../../features';

type TypographyEnhancedProps = TypographyProps &
  LinkProps & {
    isActive: boolean;

    // Note:
    // The types for the (styled) typography component are broken- type-inference is not working as expected.
    // Specifying the component property on styled typography is not possible; the property does not exist.
    // The utilization of the component property works, e.g., on a styled box component as expected.
    component?: ElementType;
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
  pathname: string;
  query: ParsedUrlQuery;
  href: string;
}

export const TocLink: FC<TocLinkProps> = ({
  pathname,
  query,
  href,
  children
}) => {
  const {
    scroll: {
      selector: { scrollIsActiveSelector }
    }
  } = features;

  const isActive = useRecoilValue(scrollIsActiveSelector(href));

  return (
    <TocLabel
      component={HiddenUnderlineLink}
      href={{
        pathname,
        query,
        hash: href
      }}
      // replace // todo: check
      shallow
      passHref
      prefetch={false}
      isActive={isActive}
    >
      {children}
    </TocLabel>
  );
};
