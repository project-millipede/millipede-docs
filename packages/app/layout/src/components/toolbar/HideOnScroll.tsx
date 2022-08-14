import { useMediaQuery } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { FC, ReactNode } from 'react';

type HideOnScrollProps = {
  direction?: 'up' | 'down' | 'left' | 'right';
};

export const HideOnScroll: FC<
  HideOnScrollProps & {
    children: ReactNode;
  }
> = ({ direction = 'down', children }) => {
  const trigger = useScrollTrigger();

  const outerTheme = useTheme();

  const matches = useMediaQuery(outerTheme.breakpoints.down('md'), {
    noSsr: true
  });

  return (
    <>
      {matches ? (
        <Slide appear={false} direction={direction} in={!trigger}>
          {children as any}
        </Slide>
      ) : (
        children
      )}
    </>
  );
};
