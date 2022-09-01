import { Components as RenderComponents } from '@app/render-utils';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { FC, ReactNode } from 'react';

const {
  Responsive: { isMobile }
} = RenderComponents;

type HideOnScrollProps = {
  direction?: 'up' | 'down' | 'left' | 'right';
};

export const HideOnScroll: FC<
  HideOnScrollProps & {
    children: ReactNode;
  }
> = ({ direction = 'down', children }) => {
  const trigger = useScrollTrigger();

  return (
    <>
      {isMobile() ? (
        <Slide appear={false} direction={direction} in={!trigger}>
          {children as any}
        </Slide>
      ) : (
        children
      )}
    </>
  );
};
