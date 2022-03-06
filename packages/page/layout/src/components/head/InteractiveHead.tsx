import { HiddenUnderlineLink } from '@app/components';
import { CollectionUtil } from '@app/utils';
import { TypographyProps } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilCallback } from 'recoil';

import { features } from '../../features';
import { Anchor, StyledTypography } from './InteractiveHead.svc';

interface InteractiveHeadProps {
  variant: TypographyProps['variant'];
  // id generated through slug
  id: string;
  className?: string;
  renderChildren?: boolean;
}

export const InteractiveHead: FC<InteractiveHeadProps> = ({
  variant,
  id,
  className,
  renderChildren,
  children
}) => {
  const {
    scroll: {
      states: { scrollState }
    }
  } = features;

  const { pathname, query } = useRouter();

  const addScrollItem = useRecoilCallback(
    ({ set, snapshot }) =>
      (item: string) => {
        const { scrollItems } = snapshot.getLoadable(scrollState).getValue();

        const index = scrollItems.findIndex(scrollItem => scrollItem === item);

        if (index === -1) {
          set(scrollState, state => {
            return { ...state, scrollItems: [...state.scrollItems, item] };
          });
        }

        // set(scrollState, state => {
        //   const index = state.scrollItems.findIndex(
        //     scrollItem => scrollItem === item
        //   );
        //   return index === -1
        //     ? { ...state, scrollItems: [...state.scrollItems, item] }
        //     : state;
        // });
      },
    []
  );

  const removeScrollItem = useRecoilCallback(
    ({ set, snapshot }) =>
      (item: string) => {
        const { scrollItems } = snapshot.getLoadable(scrollState).getValue();

        const index = scrollItems.findIndex(scrollItem => scrollItem === item);

        if (index !== -1) {
          set(scrollState, state => {
            return {
              ...state,
              scrollItems: CollectionUtil.Array.omitAtIndex(
                state.scrollItems,
                index
              )
            };
          });
        }

        // set(scrollState, state => {
        //   const index = state.scrollItems.findIndex(
        //     scrollItem => scrollItem === item
        //   );
        //   return index !== -1
        //     ? {
        //         ...state,
        //         scrollItems: CollectionUtil.Array.omitAtIndex(
        //           state.scrollItems,
        //           index
        //         )
        //       }
        //     : state;
        // });
      },
    []
  );

  const [inViewRef, inView, entry] = useInView();

  useEffect(() => {
    if (entry && entry.target) {
      const {
        target: { id: inViewElementId }
      } = entry;
      if (inView) {
        addScrollItem(inViewElementId);
      }
      if (!inView) {
        removeScrollItem(inViewElementId);
      }
    }
  }, [inView]);

  return (
    <StyledTypography
      variant={variant}
      className={className}
      suppressHydrationWarning={!renderChildren}
    >
      {renderChildren ? (
        <>
          <Anchor id={encodeURIComponent(id)} ref={inViewRef} />
          {children}
          <HiddenUnderlineLink
            href={{
              pathname,
              query,
              hash: id
            }}
            replace
            shallow
            passHref
            prefetch={false}
          >
            #
          </HiddenUnderlineLink>
        </>
      ) : null}
    </StyledTypography>
  );
};
