import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSetRecoilState } from 'recoil';

import { scrollItemsReducer, scrollItemsState } from '../../recoil/features/scroll/page/reducer';

// import { isMobile } from 'react-device-detect';

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
    },
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
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
    },
    headerText: {
      hyphens: 'auto',
      '-ms-hyphens': 'auto',
      '-moz-hyphens': 'auto',
      '-webkit-hyphens': 'auto'
    }
  })
);

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
  const classes = useStyles();

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
  }, [inView, id]);

  return (
    <div className={classes.heading}>
      <Typography id={id} ref={ref} component='a' className={classes.element} />
      <Typography variant={variant} className={classes.headerText}>
        {children}
        <Typography component='a' href={`#${id}`}>
          <LinkIcon />
        </Typography>
      </Typography>
    </div>
  );
};
