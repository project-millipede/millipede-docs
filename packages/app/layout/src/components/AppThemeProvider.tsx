import { blue } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { FC, ReactNode, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const themeInitialOptions = {
  spacing: 8 // spacing unit
};

/**
 * Used fonts:
 * The default font is Roboto, only a sub-set of available font-weights gets used (400;500;700)
 */

export const AppThemeProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { spacing } = themeInitialOptions;

  const theme = useMemo(() => {
    const nextTheme = createTheme({
      spacing,
      typography: {
        fontFamily: "'Roboto', sans-serif",
        h1: {
          fontWeight: 700,
          fontSize: '4.5rem',
          margin: '20px 0'
        },
        h2: {
          fontWeight: 500,
          // For header in landing - reduced from 3rem to 2.5rem
          fontSize: '2.5rem',
          margin: '16px 0'
        },
        h3: {
          fontWeight: 500,
          fontSize: '1.5rem',
          margin: '12px 0'
        },
        h4: {
          fontWeight: 400,
          fontSize: '1.25rem',
          margin: '10px 0'
        },
        h5: {
          fontWeight: 400,
          fontSize: '1rem',
          margin: '8px 0'
        },
        h6: {
          fontWeight: 400,
          fontSize: '1rem',
          margin: '8px 0'
        }
      },
      palette: {
        primary: {
          main: blue[700]
        },
        secondary: {
          main: blue[500]
        }
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      }
    });
    return nextTheme;
  }, [spacing]);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />

        {/* <GlobalStyles
          styles={{
            body: {
              boxSizing: 'border-box'
            }
          }}
        /> */}

        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};
