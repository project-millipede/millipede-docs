import { useHoux } from '@app/houx';
import { RootState as LayoutState } from '@app/layout';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import React, { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSetRecoilState } from 'recoil';

import { scrollItemsReducer, scrollItemsState } from '../../../modules/recoil/features/scroll/page/reducer';

interface InteraktiveHeadProps {
  // id generated through slug
  id: string;
  variant: 'h2' | 'h3' | 'h4';
  children: ReactNode;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    element: {
      position: 'absolute',
      marginTop: '-96px'
    },
    heading: {
      '& h2, & h3, & h4': {
        '& a': {
          display: 'none',
          padding: `0 ${theme.spacing(1)}px`
        },
        '&:hover a': {
          display: 'inline-block',
          color: theme.palette.text.secondary,
          '&:hover': {
            color: theme.palette.text.primary
          }
        }
      }
    }
  })
);

const InteraktiveHead = ({ id, variant, children }: InteraktiveHeadProps) => {
  const classes = useStyles();

  const setScrollItemsState = useSetRecoilState(scrollItemsState);

  const addItem = (item: string) => {
    setScrollItemsState(state => scrollItemsReducer.addItem(state, item));
  };

  const removeItem = (item: string) => {
    setScrollItemsState(state => scrollItemsReducer.removeItem(state, item));
  };

  const {
    state: { view: { isMobile } } = {
      view: {
        isMobile: false
      }
    } as any
  }: { state: LayoutState } = useHoux();

  const [ref, inView, entry] = useInView();

  useEffect(() => {
    if (isMobile) {
      return;
    }
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
  }, [inView, id]);

  return (
    <div className={classes.heading}>
      <Typography id={id} ref={ref} component='a' className={classes.element} />
      <Typography variant={variant}>
        {children}
        <Typography component='a' href={`#${id}`}>
          <LinkIcon />
        </Typography>
      </Typography>
    </div>
  );
};

export default InteraktiveHead;
