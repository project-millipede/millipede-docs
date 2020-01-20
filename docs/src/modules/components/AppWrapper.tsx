import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import { useHoux } from 'houx';
import { create } from 'jss';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga';

import { NavigationActions } from '../redux/features/actionType';
import { loadPages } from '../redux/features/navigation/actions';
import { ThemeProvider } from './ThemeProvider';

interface Props {
  children?: ReactNode;
}

const jss = create({
  plugins: [...jssPreset().plugins]
  // insertionPoint: process.browser ? document.querySelector('#insertion-point-jss') : null,
});

const AppWrapper = ({ children }: Props) => {
  const router = useRouter();

  const {
    dispatch
  }: { dispatch: React.Dispatch<NavigationActions> } = useHoux();

  useEffect(() => {
    dispatch(loadPages(router.pathname));
    ReactGA.pageview(router.pathname);
  }, [router.pathname]);

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default AppWrapper;
