import { Box, Typography, TypographyProps } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Components } from '@page/layout';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface HeaderProps {
  variant: TypographyProps['variant'];
  id?: string;
}

export const Header: FC<HeaderProps> = ({ variant, id, children }) => {
  const { pathname, query } = useRouter();

  return (
    <Components.Head.InteractiveHead
      variant={variant}
      id={id}
      pathname={pathname}
      query={query}
    >
      {children}
    </Components.Head.InteractiveHead>
  );
};

export const h1: FC = ({ children }) => (
  <Typography variant='h1'>{children}</Typography>
);

export const h5: FC = ({ children }) => (
  <Typography variant='h5'>{children}</Typography>
);
export const h6: FC = ({ children }) => (
  <Typography variant='h6'>{children}</Typography>
);

export const blockquote = styled(Box)(({ theme }) => ({
  borderLeft: `${theme.spacing(0.5)} solid ${blue[500]}`,
  backgroundColor: 'rgb(33, 150, 243, 0.2)',
  margin: theme.spacing(3, 0),
  '& p': {
    margin: 0,
    padding: theme.spacing(2)
  }
}));
