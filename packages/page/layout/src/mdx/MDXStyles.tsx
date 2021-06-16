import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMdxStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      color: theme.palette.text.primary,
      '& h1': {
        fontSize: 48,
        fontWeight: theme.typography.fontWeightLight,
        margin: 'auto 0'
      },
      '& h2': {
        fontSize: 40,
        fontWeight: theme.typography.fontWeightLight,
        margin: '32px 0 16px'
      },
      '& h3': {
        fontSize: 32,
        fontWeight: theme.typography.fontWeightLight,
        margin: '24px 0 16px'
      },
      '& h4': {
        fontSize: 28,
        fontWeight: theme.typography.fontWeightLight,
        margin: '24px 0 16px'
      },
      '& h5': {
        fontSize: 24,
        fontWeight: theme.typography.fontWeightLight,
        margin: '24px 0 16px'
      },
      '& h6': {
        fontSize: 20,
        fontWeight: theme.typography.fontWeightLight,
        margin: '16px 0 16px'
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
  };
});
