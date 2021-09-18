import { Link } from '@app/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TypographyProps } from '@material-ui/core';
import { ParsedUrlQuery } from 'querystring';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSetRecoilState } from 'recoil';

import { scrollItemsReducer, scrollItemsState } from '../../recoil/features/scroll/page/reducer';
import { Anchor, StyledTypography } from './InteractiveHead.svc';

interface InteractiveHeadProps {
  // id generated through slug
  id: string;
  variant: TypographyProps['variant'];
  query: ParsedUrlQuery;
  pathname: string;
}

export const InteractiveHead: FC<InteractiveHeadProps> = ({
  id,
  variant,
  query,
  pathname,
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
    <StyledTypography variant={variant}>
      <Anchor id={id} ref={ref} />
      {children}
      <Link href={{ pathname, query, hash: `#${id}` }} shallow prefetch={false}>
        <FontAwesomeIcon icon={'hashtag'} />
      </Link>
    </StyledTypography>
  );
};
