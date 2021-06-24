import { SvgIcon, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSetRecoilState } from 'recoil';

import { scrollItemsReducer, scrollItemsState } from '../../recoil/features/scroll/page/reducer';
import { Anchor, CLASS_HEADER, HeaderLink } from './InteractiveHead.svc';

interface InteractiveHeadProps {
  // id generated through slug
  id: string;
  variant: 'h2' | 'h3' | 'h4';
}

export const InteractiveHead: FC<InteractiveHeadProps> = ({
  id,
  variant,
  children
}) => {
  const setScrollItemsState = useSetRecoilState(scrollItemsState);

  const addItem = (item: string) => {
    setScrollItemsState(state => scrollItemsReducer.addItem(state, item));
  };

  const removeItem = (item: string) => {
    setScrollItemsState(state => scrollItemsReducer.removeItem(state, item));
  };

  const [ref, inView, entry] = useInView();

  useEffect(() => {
    if (entry && entry.target) {
      const {
        target: { id: inViewElementId }
      } = entry;
      if (inView) {
        addItem(inViewElementId);
      }
      if (!inView) {
        removeItem(inViewElementId);
      }
    }
  }, [inView]);

  return (
    <>
      <Anchor id={id} ref={ref} />

      <Typography
        variant={variant}
        className={CLASS_HEADER}
        style={{
          display: 'inline-block'
        }}
      >
        <span
          style={{
            display: 'inline-block'
          }}
        >
          {children}
          <HeaderLink href={'#' + id}>
            <SvgIcon
              component={LinkIcon}
              fontSize={
                variant === 'h2' || variant === 'h3' ? 'medium' : 'small'
              }
            />
          </HeaderLink>
        </span>
      </Typography>
    </>
  );
};
