import { createTheme, responsiveFontSizes, ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
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
      }
    });

    return responsiveFontSizes(nextTheme);
  }, [spacing]);

  return (
    <StyledThemeProvider theme={theme}>
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </StyledThemeProvider>
  );
};
