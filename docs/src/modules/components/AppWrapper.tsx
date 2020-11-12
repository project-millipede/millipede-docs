import { useHoux } from '@houx';
import { jssPreset, StylesProvider } from '@material-ui/core';
import { create } from 'jss';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga';

import { NavigationActions, ViewActions } from '../redux/features/actionType';
import { loadPages } from '../redux/features/navigation/actions';
import { handleDevice } from '../redux/features/view/actions';
import { ThemeProvider } from './ThemeProvider';

interface AppWrapperProps {
  children: ReactNode;
  isMobile: boolean;
}

export const jss = create({
  plugins: [...jssPreset().plugins]
});

const AppWrapper: FC<AppWrapperProps> = ({ children, isMobile }) => {
  const { pathname } = useRouter();

  const {
    dispatch: dispatchNavigationActions
  }: {
    dispatch: Dispatch<NavigationActions>;
  } = useHoux();

  const {
    dispatch: dispatchViewActions
  }: {
    dispatch: Dispatch<ViewActions>;
  } = useHoux();

  useEffect(() => {
    dispatchViewActions(handleDevice(isMobile));
    dispatchNavigationActions(loadPages(pathname));
    ReactGA.pageview(pathname);
  }, [pathname]);

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default AppWrapper;
