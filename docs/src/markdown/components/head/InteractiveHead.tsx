import { Typography } from '@material-ui/core';
import { useHoux } from 'houx';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';

import { ScrollActions } from '../../../modules/redux/features/actionType';
import { addScrollNavigation, removeScrollNavigation } from '../../../modules/redux/features/scroll/actions';

interface HeadProps extends React.Props<any> {
  // id generated through slug
  id: string;
  component: 'h2' | 'h3';
}

export const InderaktiveHead = ({ id, component, children }: HeadProps) => {
  const { dispatch }: { dispatch: React.Dispatch<ScrollActions> } = useHoux();

  const [ref, inView, entry] = useInView({ threshold: 0 });
  const target = entry && entry.target;

  useEffect(() => {
    if (inView && ref) {
      const handleScroll = () => {
        if (!target) return;
        dispatch(addScrollNavigation(target.id));
      };
      handleScroll();
    } else if (!inView && ref) {
      const handleScroll = () => {
        if (!target) return;
        dispatch(removeScrollNavigation(target.id));
      };
      handleScroll();
    }
  }, [inView, target]);

  return (
    <div ref={ref} id={id}>
      <Element name={id}>
        <Typography variant={component}>{children}</Typography>
      </Element>
    </div>
  );
};

export default InderaktiveHead;
