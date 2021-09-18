import { blue } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React, { FC, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const themeInitialOptions = {
  spacing: 8 // spacing unit
};

export const AppThemeProvider: FC = ({ children }) => {
  const { spacing } = themeInitialOptions;

  const theme = useMemo(() => {
    const nextTheme = createTheme({
      spacing,
      typography: {
        fontFamily: 'Roboto',
        h1: {
          fontWeight: 700,
          fontSize: '4.5rem',
          margin: '20px 0'
        },
        h2: {
          fontWeight: 500,
          fontSize: '3rem',
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
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};
