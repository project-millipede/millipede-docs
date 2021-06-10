import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { FC, ReactElement } from 'react';

type HideOnScrollProps = {
  children: ReactElement;
  direction?: 'up' | 'down' | 'left' | 'right';
};

export const HideOnScroll: FC<HideOnScrollProps> = ({
  children,
  direction = 'down'
}) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
};
