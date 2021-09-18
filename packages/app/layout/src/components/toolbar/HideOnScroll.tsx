import { Theme, useMediaQuery } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
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
