import { blue } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, responsiveFontSizes, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React, { FC, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const themeInitialOptions = {
  spacing: 8 // spacing unit
};

export const ThemeProvider: FC = ({ children }) => {
  const { spacing } = themeInitialOptions;

  const theme = useMemo(() => {
    const nextTheme = createTheme({
      spacing,
      typography: {
        fontFamily: 'Roboto'
      },
      palette: {
        primary: {
          main: blue[700]
        },
        secondary: {
          main: blue[500]
        }
      }
    });

    return responsiveFontSizes(nextTheme);
  }, [spacing]);

  return (
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
};
