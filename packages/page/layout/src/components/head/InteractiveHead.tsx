import { HiddenUnderlineLink } from '@app/components';
import { CollectionUtil } from '@app/utils';
import { FC, ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilCallback } from 'recoil';

import { features } from '../../features';
import { Anchor } from './InteractiveHead.svc';

interface InteractiveHeadProps {
  // id generated through slug
  id: string;
  children?: ReactNode;
}

export const InteractiveHead: FC<InteractiveHeadProps> = ({ id, children }) => {
  const {
    scroll: {
      states: { scrollState }
    }
  } = features;

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
    <>
      <Anchor id={encodeURIComponent(id)} ref={inViewRef} />
      {children}
      <HiddenUnderlineLink
        href={{
          hash: id
        }}
        shallow
        prefetch={false}
      >
        #
      </HiddenUnderlineLink>
    </>
  );
};

export default InteractiveHead;
