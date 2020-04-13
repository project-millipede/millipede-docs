import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import { useHoux } from 'houx';
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
  const router = useRouter();

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
    dispatchNavigationActions(loadPages(router.pathname));
    ReactGA.pageview(router.pathname);
  }, [router.pathname]);

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default AppWrapper;
