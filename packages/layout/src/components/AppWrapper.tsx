import { useHoux } from '@app/houx';
import { StylesProvider } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, ReactNode, useEffect } from 'react';
import { useAnalytics } from 'use-analytics';

import { NavigationActions, ViewActions } from '../redux/features/actionType';
import { loadPages } from '../redux/features/navigation/actions';
import { handleDevice } from '../redux/features/view/actions';
import { ThemeProvider } from './ThemeProvider';

interface AppWrapperProps {
  children: ReactNode;
  isMobile: boolean;
}

export const AppWrapper: FC<AppWrapperProps> = ({ children, isMobile }) => {
  const { pathname } = useRouter();

  const { page } = useAnalytics();

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
    page();
  }, [pathname]);

  return (
    <StylesProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StylesProvider>
  );
};
