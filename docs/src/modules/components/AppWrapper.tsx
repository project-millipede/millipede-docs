import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import { useHoux } from 'houx';
import { create } from 'jss';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

import { NavigationActions } from '../redux/features/actionType';
import { loadPages } from '../redux/features/navigation/actions';
import { ThemeProvider } from './ThemeProvider';

interface OProps extends React.Props<any> {}

type Props = OProps & WithRouterProps;

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins]
});

// const generateClassName = createGenerateClassName();

const AppWrapper = ({ children, router }: Props) => {
  // Remove the server-side injected CSS.
  // const jssStyles = document.querySelector("#jss-server-side");
  // if (jssStyles) {
  //   jssStyles.parentNode.removeChild(jssStyles);
  // }

  const { dispatch }: { dispatch: React.Dispatch<NavigationActions> } = useHoux();

  useEffect(() => {
    dispatch(loadPages(router.pathname));
    ReactGA.pageview(router.pathname);
  }, [router.pathname]);

  // return (
  //   <StylesProvider generateClassName={generateClassName} jss={jss}>
  //     {children}
  //   </StylesProvider>
  // );

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider>{children}</ThemeProvider>
      {/* <SideEffects /> */}
    </StylesProvider>
  );
};

export default withRouter(AppWrapper);
