import { Theme, useMediaQuery } from '@mui/material';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { FC, ReactElement } from 'react';

type HideOnScrollProps = {
  direction?: 'up' | 'down' | 'left' | 'right';
  children: ReactElement;
};

export const HideOnScroll: FC<HideOnScrollProps> = ({
  direction = 'down',
  children
}) => {
  const trigger = useScrollTrigger();
  const matches = useMediaQuery(
    (theme: Theme) => theme.breakpoints.down('md'),
    {
      noSsr: true
    }
  );

  return (
    <>
      {matches ? (
        <Slide appear={false} direction={direction} in={!trigger}>
          {children}
        </Slide>
      ) : (
        children
      )}
    </>
  );
};
