import { Link, LinkProps } from '@app/components';
import { Box, BoxProps } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';

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
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#E0E0E0',
      textDecoration: 'none'
    },
    ...(selected && {
      cursor: 'pointer',
      backgroundColor: '#E0E0E0',
      textDecoration: 'none'
    })
  })
);

export type CustomBoxProps = BoxProps & {
  routeSegement?: string;
  dynamicRef?: MutableRefObject<SelectHandles>;
  children: ReactNode;
};

const CustomBox: ForwardRefRenderFunction<HTMLDivElement, CustomBoxProps> = (
  { routeSegement, bgcolor, sx, dynamicRef, children },
  ref
) => {
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
      component={routeSegement && Link}
      selected={selected}
      // onClick={_e => {
      //   if (routeSegement != null) {
      //     push(
      //       {
      //         pathname,
      //         query,
      //         hash: routeSegement
      //       },
      //       null,
      //       { locale }
      //     );
      //   }
      // }}
      ref={ref}
      href={
        {
          pathname,
          query,
          hash: routeSegement
        } as any
      }
      sx={sx}
      bgcolor={bgcolor}
    >
      {children}
    </StyledBox>
  );
};

export default forwardRef(CustomBox);
