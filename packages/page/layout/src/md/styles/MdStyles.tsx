import { createStyles, Theme } from '@material-ui/core';

export const useMdStyles = (theme: Theme) =>
  createStyles({
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      color: theme.palette.text.primary,
      '& pre': {
        margin: '24px 0',
        padding: '12px 18px',
        backgroundColor: '#272c34',
        direction: 'ltr',
        borderRadius: theme.shape.borderRadius,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch' // iOS momentum scrolling.
      },
      '& code': {
        display: 'inline-block',
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        WebkitFontSmoothing: 'subpixel-antialiased',
        padding: '2px 6px',
        color: theme.palette.text.primary,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,229,100,0.2)'
            : 'rgba(255,229,100,0.1)',
        fontSize: 14,
        borderRadius: 2
      },
      '& code[class*="language-"]': {
        backgroundColor: '#272c34',
        color: '#fff'
      },
      '& p code, & ul code, & pre code': {
        fontSize: 14
      },
      '& .token.operator': {
        background: 'transparent'
      },
      '& h1': {
        ...theme.typography.h3,
        fontSize: 40,
        margin: '16px 0'
      },
      '& .description': {
        ...theme.typography.h5,
        margin: '0 0 40px'
      },
      '& h2': {
        ...theme.typography.h4,
        fontSize: 30,
        margin: '40px 0 16px'
      },
      '& h3': {
        ...theme.typography.h5,
        // margin: '40px 0 16px'
        margin: '16px 0 16px'
      },
      '& h4': {
        ...theme.typography.h6,
        // margin: '32px 0 16px'
        margin: '16x 0 16px'
      },
      '& h5': {
        ...theme.typography.subtitle2,
        margin: '32px 0 16px'
      },
      '& blockquote': {
        borderLeft: '5px solid #ffe564',
        backgroundColor: 'rgba(255,229,100,0.2)',
        padding: '4px 24px',
        margin: '24px 0',
        '& p': {
          marginTop: '16px'
        }
      },
      '& img': {
        maxWidth: '100%'
      }
    }
  });
