import { SvgIcon, Theme, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSetRecoilState } from 'recoil';

import { scrollItemsReducer, scrollItemsState } from '../../recoil/features/scroll/page/reducer';
import { Anchor, CLASS_HEADER } from './InteractiveHead.svc';

export const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    '& h2, & h3, & h4': {
      '& a': {
        visibility: 'hidden',
        display: 'inline-block',
        padding: theme.spacing(0, 1)
      },
      '&:hover a': {
        visibility: 'visible',
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
}));

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
  }, [inView]);

  return (
    <div className={classes.heading}>
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
          {/* <HeaderLink href={'#' + id}>
            <SvgIcon
              component={LinkIcon}
              fontSize={
                variant === 'h2' || variant === 'h3' ? 'medium' : 'small'
              }
            />
          </HeaderLink> */}
          <a
            href={'#' + id}
            style={{
              display: 'inline-block',
              textDecoration: 'none'
            }}
          >
            <SvgIcon
              component={LinkIcon}
              fontSize={
                variant === 'h2' || variant === 'h3' ? 'medium' : 'small'
              }
            />
          </a>
        </span>
      </Typography>
    </div>
  );
};
