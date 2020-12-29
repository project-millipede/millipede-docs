import { RouterUtils } from '@app/utils';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useAnalytics } from 'use-analytics';

import { loadPages } from '../pages';
import { navigationState } from '../recoil/features/pages/reducer';
import { ThemeProvider } from './ThemeProvider';

// import { StylesProvider as CoreStylesProvider } from '@material-ui/core';

export const jss = create({
  plugins: [...jssPreset().plugins]
});

export const AppWrapper: FC = ({ children }) => {
  const { page } = useAnalytics();

  const { asPath } = useRouter();

  const [navigation, setNavigation] = useRecoilState(navigationState);

  const { flattenedPages } = navigation;

  useEffect(() => {
    const pages = loadPages(asPath);
    const flattenedPages = RouterUtils.flattenPages(pages, 'children');
    const activePage = RouterUtils.findSelectedPageAsObject(
      flattenedPages,
      asPath
    );
    setNavigation(state => {
      return {
        ...state,
        pages,
        flattenedPages,
        activePage
      };
    });
    page();
  }, []);

  useEffect(() => {
    if (asPath != null && flattenedPages != null && flattenedPages.length > 0) {
      const activePage = RouterUtils.findSelectedPageAsObject(
        flattenedPages,
        asPath
      );
      setNavigation(state => {
        return {
          ...state,
          activePage
        };
      });
      page();
    }
  }, [asPath]);

  return (
    // <CoreStylesProvider injectFirst>
    <StylesProvider jss={jss}>
      <ThemeProvider>{children}</ThemeProvider>
    </StylesProvider>
    // </CoreStylesProvider>
  );
};
