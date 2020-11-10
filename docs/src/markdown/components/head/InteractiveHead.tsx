import { useHoux } from '@houx';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import React, { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { atom, useRecoilState } from 'recoil';

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

export const selectedElementIdsState = atom<Set<string>>({
  key: 'selectedElementIds',
  default: new Set()
});

const InteraktiveHead = ({ id, variant, children }: InteraktiveHeadProps) => {
  const classes = useStyles();

  const {
    state: {
      view: { isMobile }
    }
  }: { state: RootState } = useHoux();

  const [ref, inView, entry] = useInView();

  const [selectedElements, setSelectedElements] = useRecoilState(
    selectedElementIdsState
  );

  useEffect(() => {
    if (isMobile) {
      return;
    }
    if (entry && entry.target) {
      const {
        target: { id: inViewElementId }
      } = entry;
      if (inView) {
        selectedElements.add(inViewElementId);
        setSelectedElements(selectedElements);
      }
      if (!inView) {
        selectedElements.delete(inViewElementId);
        setSelectedElements(selectedElements);
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
