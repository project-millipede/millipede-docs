import { makeStyles, Theme } from '@material-ui/core';

export const useMdxStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      color: theme.palette.text.primary,
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
        margin: '40px 0 16px'
      },
      '& h4': {
        ...theme.typography.h6,
        margin: '32px 0 16px'
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
  };
});
