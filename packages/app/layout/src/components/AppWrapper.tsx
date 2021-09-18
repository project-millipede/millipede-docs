import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useAnalytics } from 'use-analytics';

import { AppThemeProvider } from './AppThemeProvider';

export const AppWrapper: FC = ({ children }) => {
  const { page } = useAnalytics();

  const { asPath } = useRouter();

  useEffect(() => {
    page();
  }, [asPath]);

  return <AppThemeProvider>{children}</AppThemeProvider>;
};
