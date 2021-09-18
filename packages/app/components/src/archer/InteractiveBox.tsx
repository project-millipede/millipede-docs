import { HiddenUnderlineLink } from '@app/components';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';

import { LinkProps } from '../link';
import { SelectHandles } from './types';

export type BoxEnhancedProps = BoxProps &
  LinkProps & {
    selected: boolean;
  };

export const StyledBox = styled(Box)<BoxEnhancedProps>(
  ({ selected, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid black',
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#E0E0E0'
    },
    ...(selected && {
      cursor: 'pointer',
      backgroundColor: '#E0E0E0'
    })
  })
);

export type InteractiveBoxProps = BoxProps & {
  routeSegement?: string;
  dynamicRef?: MutableRefObject<SelectHandles>;
  children: ReactNode;
};

const InteractiveBox: ForwardRefRenderFunction<
  HTMLDivElement,
  InteractiveBoxProps
> = ({ routeSegement, sx, dynamicRef, children }, ref) => {
  const [selected, setSelected] = useState(false);

  useImperativeHandle(
    dynamicRef,
    () => ({
      select: () => {
        setSelected(true);
      },
      unSelect: () => {
        setSelected(false);
      }
    }),
    []
  );

  const { pathname, query } = useRouter();

  return (
    <StyledBox
      ref={ref as any}
      selected={selected}
      sx={sx}
      component={routeSegement && HiddenUnderlineLink}
      href={{
        pathname,
        query,
        hash: routeSegement
      }}
      shallow
      prefetch={false}
    >
      {children}
    </StyledBox>
  );
};

export default forwardRef(InteractiveBox);
