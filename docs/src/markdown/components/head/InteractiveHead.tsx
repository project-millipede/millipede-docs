import { Typography } from '@material-ui/core';
import { useHoux } from 'houx';
import React, { Dispatch, ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

import { ScrollActions } from '../../../modules/redux/features/actionType';
import { addScrollNavigation, removeScrollNavigation } from '../../../modules/redux/features/scroll/actions';
import { RootState } from '../../../modules/redux/reducers';

interface HeadProps {
  // id generated through slug
  id: string;
  variant: 'h2' | 'h3' | 'h4';
  children: ReactNode;
}

const InteraktiveHead = ({ id, variant, children }: HeadProps) => {
  const {
    state: {
      view: { isMobile }
    },
    dispatch
  }: { state: RootState; dispatch: Dispatch<ScrollActions> } = useHoux();

  const [ref, inView, entry = { target: { id: '' } }] = useInView({
    threshold: 0
  });
  const { target } = entry;

  useEffect(() => {
    if (isMobile) {
      return;
    }
    if (inView && ref) {
      dispatch(addScrollNavigation(target.id));
    }
    if (!inView && ref) {
      dispatch(removeScrollNavigation(target.id));
    }
  }, [inView, target.id]);

  return (
    <div key={id} id={id} ref={ref}>
      {isMobile ? (
        <Typography variant={variant}>{children}</Typography>
      ) : (
        <Element name={id}>
          <Typography variant={variant}>{children}</Typography>
        </Element>
      )}
    </div>
  );
};

export default InteraktiveHead;
