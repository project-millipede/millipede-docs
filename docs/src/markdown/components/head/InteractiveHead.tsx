import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { useHoux } from 'houx';
import React, { Dispatch, ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { ScrollActions } from '../../../modules/redux/features/actionType';
import { addScrollNavigation, removeScrollNavigation } from '../../../modules/redux/features/scroll/actions';
import { RootState } from '../../../modules/redux/reducers';

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

  const {
    state: {
      view: { isMobile }
    },
    dispatch
  }: { state: RootState; dispatch: Dispatch<ScrollActions> } = useHoux();

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
        dispatch(addScrollNavigation(inViewElementId));
      }
      if (!inView) {
        dispatch(removeScrollNavigation(inViewElementId));
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
