import { createTheme, ThemeProvider as MuiThemeProvider, useTheme } from '@mui/material/styles';
import { FC, ReactNode, useMemo } from 'react';

export const DocsThemeProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const theme = useTheme();

  const docsTheme = useMemo(() => {
    const { spacing } = theme;

    const docsTheme = createTheme({
      ...theme,
      typography: {
        ...theme.typography,
        h1: {
          fontWeight: theme.typography.fontWeightBold, // 700
          fontSize: '2.5rem',
          margin: spacing(2.5, 0)
        },
        h2: {
          fontWeight: theme.typography.fontWeightMedium, // 500
          fontSize: '2rem',
          margin: spacing(2, 0)
        },
        h3: {
          fontWeight: theme.typography.fontWeightMedium, // 500
          fontSize: '1.5rem',
          margin: spacing(1.5, 0)
        },
        h4: {
          fontWeight: theme.typography.fontWeightMedium, // 500
          fontSize: '1.25rem',
          margin: spacing(1.25, 0)
        },
        h5: {
          fontWeight: theme.typography.fontWeightRegular, // 400
          fontSize: '1rem',
          margin: spacing(1, 0)
        },
        h6: {
          fontWeight: theme.typography.fontWeightRegular, // 400
          fontSize: '1rem',
          margin: spacing(1, 0)
        }
      }
    });

    return docsTheme;
  }, [theme]);

  return <MuiThemeProvider theme={docsTheme}>{children}</MuiThemeProvider>;
};
