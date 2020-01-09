import { createMuiTheme, MuiThemeProvider, PaletteType, useMediaQuery } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import { darken, Theme } from '@material-ui/core/styles';
import deepmerge from 'deepmerge';
import { useHoux } from 'houx';
import React, { useEffect, useMemo } from 'react';

import { ThemeActions } from '../redux/features/actionType';
import { changeTheme } from '../redux/features/theme/actions';
import { RootState } from '../redux/reducers';
import { getCookie } from '../utils/helpers';

const isBrowser = typeof window !== 'undefined';

export const ThemeProvider = props => {
  const { children } = props;

  const {
    state: { theme: themeOptions }
  }: { state: RootState } = useHoux();

  const { dispatch }: { dispatch: React.Dispatch<ThemeActions> } = useHoux();

  const prefersDarkMode = useMediaQuery('@media (prefers-color-scheme: dark)');
  const preferredType = prefersDarkMode ? 'dark' : 'light';

  const {
    dense,
    direction,
    paletteColors,
    paletteType = preferredType,
    spacing
  } = themeOptions;

  /* eslint-disable no-shadow */
  const usingHighDensity = (themeOptions: Partial<Theme>) => {
    return deepmerge(themeOptions, {
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
        }
      }
    });
  };

  /* eslint-disable no-shadow */
  const usingIdentity = (themeOptions: Partial<Theme>) => {
    return themeOptions;
  };

  const theme = useMemo(() => {
    const themeDefault = createMuiTheme();

    const themeDecorator = dense ? usingHighDensity : usingIdentity;
    const nextTheme = createMuiTheme(
      themeDecorator({
        direction,
        // nprogress: {
        //   color: paletteType === 'light' ? '#000' : '#fff'
        // },
        palette: {
          ...themeDefault.palette,
          primary: {
            ...themeDefault.palette.primary,
            main: paletteType === 'light' ? blue[700] : blue[200]
          },
          secondary: {
            ...themeDefault.palette.secondary,
            main: paletteType === 'light' ? darken(pink.A400, 0.1) : pink[200]
          },
          type: paletteType,
          background: {
            ...themeDefault.palette.background,
            default: paletteType === 'light' ? '#fff' : '#121212'
          },
          ...paletteColors
        },
        spacing
      })
    );

    return nextTheme;
  }, [dense, direction, paletteColors, paletteType, spacing]);

  // Restore theme information from cookie
  useEffect(() => {
    if (isBrowser) {
      // const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
      const nextPaletteType: PaletteType = getCookie(
        'paletteType'
      ) as PaletteType;

      dispatch(
        changeTheme({
          paletteType: nextPaletteType
          // paletteColors: nextPaletteColors
        })
      );
    }
  }, []);

  // Persist theme information to cookie
  useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;
  }, [paletteType]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
