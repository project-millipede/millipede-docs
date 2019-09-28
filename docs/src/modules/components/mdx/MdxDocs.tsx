import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import AppContent from '../AppContent';
import AppContentHeader from '../AppContentHeader';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      color: theme.palette.text.primary,
      '& .anchor-link': {
        marginTop: -96, // Offset for the anchor.
        position: 'absolute'
      },
      '& pre': {
        margin: '24px 0',
        padding: '12px 18px',
        // backgroundColor: theme.palette.background.level1,
        backgroundColor: theme.palette.background.default,
        direction: 'ltr',
        borderRadius: theme.shape.borderRadius,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch' // iOS momentum scrolling.
      },
      '& code[class*="language-"]': {
        boxShadow: 'none'
      },
      '& code': {
        display: 'inline-block',
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        padding: '2px 6px',
        color: theme.palette.text.primary,
        // backgroundColor: theme.palette.background.level1,
        backgroundColor: theme.palette.background.default,
        fontSize: 14,
        borderRadius: 2
      },
      '& p code, & ul code, & pre code': {
        fontSize: 14
      },
      '& .token.operator': {
        background: 'transparent'
      },
      '& .token.property, .token.tag,.token.constant, .token.symbol, .token.deleted': {
        // adjust prism-okaidia to reach AA ratio
        color: theme.palette.type === 'dark' ? '#f483ad' : undefined
      },
      '& h1': {
        ...theme.typography.h2,
        margin: '32px 0 16px'
      },
      '& .description': {
        ...theme.typography.h5,
        margin: '0 0 40px'
      },
      '& h2': {
        ...theme.typography.h4,
        margin: '32px 0 24px'
      },
      '& h3': {
        ...theme.typography.h5,
        margin: '32px 0 24px'
      },
      '& h4': {
        ...theme.typography.h6,
        margin: '24px 0 16px'
      },
      '& h5': {
        ...theme.typography.subtitle2,
        margin: '24px 0 16px'
      },
      '& p, & ul, & ol': {
        lineHeight: 1.6
      },
      '& ul': {
        paddingLeft: 30
      },
      '& h1, & h2, & h3, & h4': {
        '& code': {
          fontSize: 'inherit',
          lineHeight: 'inherit',
          // Remove scroll on small screens.
          wordBreak: 'break-all'
        },
        '& .anchor-link-style': {
          opacity: 0,
          // To prevent the link to get the focus.
          display: 'none'
        },
        '&:hover .anchor-link-style': {
          display: 'inline-block',
          opacity: 1,
          padding: '0 8px',
          color: theme.palette.text.hint,
          '&:hover': {
            color: theme.palette.text.secondary
          },
          '& svg': {
            width: '0.55em',
            height: '0.55em',
            fill: 'currentColor'
          }
        }
      },
      '& table': {
        width: '100%',
        display: 'block',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
        borderCollapse: 'collapse',
        borderSpacing: 0,
        overflow: 'hidden',
        '& .prop-name': {
          fontSize: 13,
          fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace'
        },
        '& .required': {
          color: theme.palette.type === 'light' ? '#006500' : '#9bc89b'
        },
        '& .prop-type': {
          fontSize: 13,
          fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
          color: theme.palette.type === 'light' ? '#932981' : '#dbb0d0'
        },
        '& .prop-default': {
          fontSize: 13,
          fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
          borderBottom: `1px dotted ${theme.palette.text.hint}`
        }
      },
      '& thead': {
        fontSize: 14,
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.text.secondary
      },
      '& tbody': {
        fontSize: 14,
        lineHeight: 1.5,
        color: theme.palette.text.primary
      },
      '& td': {
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: '8px 16px 8px 8px',
        textAlign: 'left'
      },
      '& td:last-child': {
        paddingRight: 24
      },
      '& td compact': {
        paddingRight: 24
      },
      '& td code': {
        fontSize: 13,
        lineHeight: 1.6
      },
      '& th': {
        whiteSpace: 'pre',
        borderBottom: `1px solid ${theme.palette.divider}`,
        fontWeight: theme.typography.fontWeightMedium,
        padding: '0 16px 0 8px',
        textAlign: 'left'
      },
      '& th:last-child': {
        paddingRight: 24
      },
      '& tr': {
        height: 48
      },
      '& thead tr': {
        height: 64
      },
      '& blockquote': {
        borderLeft: `5px solid ${theme.palette.text.hint}`,
        // backgroundColor: theme.palette.background.level1,
        backgroundColor: theme.palette.background.default,
        padding: '4px 24px',
        margin: '24px 0'
      },
      '& a, & a code': {
        // Style taken from the Link component
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      },
      '& img': {
        maxWidth: '100%'
      }
    },

    header: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
    }
  })
);

interface MarkdownDocsProps extends React.Props<any> {
  content?: any;
  meta?: any;
  ast?: any;
  headingsMap?: any;
  raw?: string;
  outerClasses?: any;
}

export const MdxDocs = (props: MarkdownDocsProps) => {
  const { content, raw, outerClasses = {} } = props;

  const classes = useStyles({});

  const [markdownFiles, setMarkdownFiles] = useState('');

  useEffect(() => {
    setMarkdownFiles(content as string);
  }, [content, raw]);

  return (
    <AppFrame>
      <AppContent className={outerClasses.root}>
        <AppContentHeader />
        <div className={clsx(classes.root, 'markdown-body')}>{markdownFiles}</div>
      </AppContent>
      <AppTableOfContents content={raw} />
    </AppFrame>
  );
};

export default MdxDocs;
