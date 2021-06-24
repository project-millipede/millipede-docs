import { Link } from '@app/components';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { scrollItemsState } from '../../recoil/features/scroll/page/reducer';

interface TocLinkProps {
  href: string;
}

export const processLink = (
  activeState: { [key: string]: string },
  href: string
) => {
  return (
    Object.keys(activeState).filter(
      activeState => activeState === decodeURI(href).replace('#', '')
    ).length > 0
  );
};

export const TocLink: FC<TocLinkProps> = ({ href, children }) => {
  const { scrollItems } = useRecoilValue(scrollItemsState);
  const isActive = processLink(scrollItems, href);

  const { query, pathname } = useRouter();

  const theme = useTheme();

  return (
    <Typography
      component={Link}
      sx={{
        display: 'block',
        fontSize: '0.875rem',
        padding: theme.spacing(1),
        color: theme.palette.text.primary,

        // TODO: do it in link
        textDecoration: 'none',

        borderLeft: isActive
          ? `2px solid ${theme.palette.grey[300]}`
          : `2px solid transparent`,
        '&:hover': {
          borderLeftColor: theme.palette.grey[200],
          // TODO: do it in link
          textDecoration: 'none'
        }
      }}
      href={
        {
          pathname,
          query,
          hash: href
        } as any
      }
    >
      {children}
    </Typography>
  );
};
