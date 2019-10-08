import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useHoux } from 'houx';
import React from 'react';
import { scroller } from 'react-scroll';

import { useTranslation } from '../../../../i18n';
import TOCComponent from '../../markdown/components/toc/TocComponent';
import { RootState } from '../redux/reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: 70,
      // Fix IE 11 position sticky issue.
      marginTop: 70,
      width: 225,
      flexShrink: 0,
      order: 2,
      position: 'sticky',
      height: 'calc(100vh - 70px)',
      overflowY: 'auto',
      padding: theme.spacing(2, 2, 2, 0),
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    contents: {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(1.5)
    },

    // TODO: Somehow this rule does not get applied
    ul: {
      padding: 0,
      margin: 0,
      listStyleType: 'none'
    },
    item: {
      fontSize: 13,
      padding: theme.spacing(0.5, 0, 0.5, 1),
      borderLeft: '4px solid transparent',
      boxSizing: 'content-box',
      '&:hover': {
        borderLeft: `4px solid ${
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`
      },
      '&$active,&:active': {
        borderLeft: `4px solid ${
          theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
        }`
      }
    },
    secondaryItem: {
      paddingLeft: theme.spacing(2.5)
    },
    active: {}
  })
);

const scrollToLink = (href: string) => {
  scroller.scrollTo(href.slice(1), {
    duration: 600,
    offset: -85,
    delay: 0,
    smooth: 'ease',
    containerId: 'main-content'
  });
};

interface AppTableOfContentsProps {
  content: string;
}

const AppTableOfContents = ({ content }: AppTableOfContentsProps) => {
  const classes = useStyles({});

  const { state }: { state: RootState } = useHoux();

  const { t } = useTranslation();

  const handleClick = (hash: string) => {
    scrollToLink(hash);
  };

  return (
    <nav className={classes.root} aria-label={t('toc')}>
      <React.Fragment>
        <Typography gutterBottom className={classes.contents}>
          {t('toc')}
        </Typography>
        <TOCComponent
          content={content}
          activeState={state.scroll.position as Set<string>}
          scrollToLink={handleClick}
        />
      </React.Fragment>
    </nav>
  );
};

export default AppTableOfContents;
