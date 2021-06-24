import { RouterUtils } from '@app/utils';
import { StyledEngineProvider } from '@material-ui/core/styles';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useAnalytics } from 'use-analytics';

import { loadPages } from '../pages';
import { navigationState } from '../recoil/features/pages/reducer';
import { ThemeProvider } from './ThemeProvider';

export const jss = create({
  plugins: [...jssPreset().plugins]
});

export const AppWrapper: FC = ({ children }) => {
  const { page } = useAnalytics();

  const { asPath, locale } = useRouter();

  const [navigation, setNavigation] = useRecoilState(navigationState);

  const { flattenedPages } = navigation;

  useEffect(() => {
    const pages = loadPages(asPath);
    const flattenedPages = RouterUtils.flattenPages(pages, 'children');
    const activePage = RouterUtils.findSelectedPageAsObject(
      flattenedPages,
      asPath,
      locale
    );

    const selectedPage = RouterUtils.findSelectedPage(
      flattenedPages,
      `/docs/${activePage.pathname}`
    );
    const expandedPages = RouterUtils.findExpandedPages(
      flattenedPages,
      `/docs/${activePage.pathname}`
    );

    setNavigation(state => {
      return {
        ...state,
        pages,
        flattenedPages,
        activePage,
        selectedPage,
        expandedPages
      };
    });
    page();
  }, []);

  useEffect(() => {
    if (asPath != null && flattenedPages != null && flattenedPages.length > 0) {
      const activePage = RouterUtils.findSelectedPageAsObject(
        flattenedPages,
        asPath,
        locale
      );

      const selectedPage = RouterUtils.findSelectedPage(
        flattenedPages,
        `/docs/${activePage.pathname}`
      );
      const expandedPages = RouterUtils.findExpandedPages(
        flattenedPages,
        `/docs/${activePage.pathname}`
      );

      setNavigation(state => {
        return {
          ...state,
          activePage,
          selectedPage,
          expandedPages
        };
      });
      page();
    }
  }, [asPath]);

  return (
    <StyledEngineProvider injectFirst>
      <StylesProvider jss={jss}>
        <ThemeProvider>{children}</ThemeProvider>
      </StylesProvider>
    </StyledEngineProvider>
  );
};
