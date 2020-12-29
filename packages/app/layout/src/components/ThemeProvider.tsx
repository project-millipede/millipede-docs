import { createMuiTheme, darken, ThemeProvider as MaterialThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import React, { FC, ReactNode, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const themeInitialOptions = {
  dense: false,
  direction: 'ltr',
  paletteColors: {},
  spacing: 8 // spacing unit
};

const highDensity = {
  props: {
    MuiButton: {
      size: 'small'
    },
    MuiFilledInput: {
      margin: 'dense'
    },
    MuiFormControl: {
      margin: 'dense'
    },
    MuiFormHelperText: {
      margin: 'dense'
    },
    MuiIconButton: {
      size: 'small'
    },
    MuiInputBase: {
      margin: 'dense'
    },
    MuiInputLabel: {
      margin: 'dense'
    },
    MuiListItem: {
      dense: true
    },
    MuiOutlinedInput: {
      margin: 'dense'
    },
    MuiFab: {
      size: 'small'
    },
    MuiTable: {
      size: 'small'
    },
    MuiTextField: {
      margin: 'dense'
    },
    MuiToolbar: {
      variant: 'dense'
    }
  },
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        // minimal touch target hit spacing
        marginLeft: 4,
        marginRight: 4,
        padding: 12
      }
    },
    MuiDrawerPaper: {
      overflowY: 'hidden'
    }
  }
};

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { dense, paletteColors, spacing } = themeInitialOptions;

  const theme = useMemo(() => {
    const nextTheme = createMuiTheme(
      {
        palette: {
          primary: {
            main: blue[700]
          },
          secondary: {
            main: darken(pink.A400, 0.1)
          },
          background: {
            default: '#fff'
          },
          ...paletteColors
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              rounded: {
                borderRadius: '0px'
              },
              elevation1: {
                boxShadow: 'none'
              }
            }
          }
        },
        spacing
      },
      dense ? highDensity : null
    );

    return nextTheme;
  }, [dense, paletteColors, spacing]);

  return (
    <StyledThemeProvider theme={theme}>
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </StyledThemeProvider>
  );
};
