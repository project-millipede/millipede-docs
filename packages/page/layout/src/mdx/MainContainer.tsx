import { TOC_TOP } from '@app/layout';
import { Breakpoint, Container, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { domAnimation, LazyMotion, m, Variants } from 'framer-motion';
import { FC, ReactNode } from 'react';

export const StyledMainContainer = styled(Container)(({ theme }) => {
  return {
    gridArea: 'app-center',
    marginTop: theme.spacing(TOC_TOP)
  };
}) as typeof Container;

interface MainContainerProps {
  id: string;
  sx?: SxProps<Theme>;
  maxWidth?: false | Breakpoint;
}

export const MainContainer: FC<
  MainContainerProps & {
    children: ReactNode;
  }
> = ({ id, sx, maxWidth, children }) => {
  return (
    <StyledMainContainer component='div' id={id} sx={sx} maxWidth={maxWidth}>
      {children}
    </StyledMainContainer>
  );
};

/**
 * Note:
 * The m-component can be used in exactly the same way as motion, but it comes with no features preloaded.
 * These are then provided by LazyMotion.
 */
const MotionArticle = m.article;

const fade: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { type: 'tween', duration: 0.4 }
  },
  exit: {
    opacity: 0,
    transition: { type: 'tween', duration: 0.4 }
  }
};

export const Article: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionArticle
        initial='initial'
        animate='enter'
        exit='exit'
        variants={fade}
      >
        {children}
      </MotionArticle>
    </LazyMotion>
  );
};
