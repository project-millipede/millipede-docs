import { CssBaseline, GlobalStyles } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider as MuiThemeProvider, useTheme } from '@mui/material/styles';
import { FC, ReactNode, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

/**
 * Used fonts
 * - Karla => Default font, all font-weights are used (200;300;400;500;700)
 *
 * - Bellota => Used in headers (h1 - h6), all font-weights are used (300;400;700)
 *
 * Note:
 * Compared to other themes, the font-weight specified for an inidivudal header differ.
 *
 * - Roboto Mono => Used in custom components such as statement, blurb, link; a sub-set of available font-weights gets used (400;500)
 */

export const BlogThemeProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const theme = useTheme();

  const blogTheme = useMemo(() => {
    const { spacing } = theme;

    const blogTheme = createTheme({
      typography: {
        fontFamily: "'Karla', sans-serif",
        h1: {
          fontFamily: "'Bellota', cursive",
          fontWeight: 700,
          fontSize: '2.5rem',
          [theme.breakpoints.up('md')]: {
            fontSize: '4.5rem'
          },
          margin: spacing(2.5, 0)
        },
        h2: {
          fontFamily: "'Bellota', cursive",
          fontWeight: 400,
          fontSize: '2rem',
          [theme.breakpoints.up('md')]: {
            fontSize: '3rem'
          },
          margin: spacing(2, 0)
        },
        h3: {
          fontFamily: "'Bellota', cursive",
          fontWeight: 400,
          fontSize: '1.5rem',
          margin: spacing(1.5, 0)
        },
        h4: {
          fontFamily: "'Bellota', cursive",
          fontWeight: 300,
          fontSize: '1.25rem',
          margin: spacing(1.25, 0)
        },
        h5: {
          fontFamily: "'Bellota', cursive",
          fontWeight: 300,
          fontSize: '1rem',
          margin: spacing(1, 0)
        },
        h6: {
          fontFamily: "'Bellota', cursive",
          fontWeight: 300,
          fontSize: '1rem',
          margin: spacing(1, 0)
        }
      }
      // palette: {
      //   primary: {
      //     main: grey[800]
      //   },
      //   secondary: {
      //     main: grey[800]
      //   }
      // }
    });
    return blogTheme;
  }, [theme]);

  return (
    <MuiThemeProvider theme={blogTheme}>
      <StyledThemeProvider theme={blogTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: grey[200],
              color: grey[800]
            }
          }}
        />
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};
