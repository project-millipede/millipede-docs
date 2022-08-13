import '@fortawesome/fontawesome-svg-core/styles.css';

import { defaultAnalytics } from '@app/analytics';
import { loadFAIcons } from '@app/components';
import { Analytics, AppWrapper } from '@app/layout';
import { Components as RenderComponents } from '@app/render-utils';
import { I18n } from '@app/utils';
import { CacheProvider } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import { RecoilRoot } from 'recoil';
import { AnalyticsProvider } from 'use-analytics';

import { createEmotionCache } from '../docs/src/lib/emotion';
import { CustomAppProps } from '../docs/src/lib/types';

config.autoAddCss = false;

loadFAIcons();

const clientSideEmotionCache = createEmotionCache();

const {
  Media: { MediaProvider }
} = RenderComponents;

const MillipedeApp: NextComponentType<
  AppContext,
  AppInitialProps,
  CustomAppProps
> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const { __namespaces, __lang, ...pagePropsWitoutI18n } = pageProps;

  const { navigation, content } = pagePropsWitoutI18n;

  const {
    query: { slug },
    locale,
    events
  } = useRouter();

  const slugStringified = Array.isArray(slug) ? slug.join('/') : slug;

  /**
   * This is put into the memo hook because inner page navigation relies on hash-change.
   * Due to a limitation / known bug when a hash change occurs Next updates the router context.
   */
  const componentWithLayout = useMemo(() => {
    const getLayout = Component.getLayout || ((page: ReactNode) => page);
    return (
      <AppWrapper events={events}>
        <I18n.I18nProvider lang={__lang} namespaces={__namespaces}>
          {getLayout(
            <Component
              /**
               * Specifing a key is required for page transitions, more specifically
               * for AnimatePresence within getLayout working correctly.
               */
              key={slugStringified}
              {...pagePropsWitoutI18n}
            />,
            navigation,
            content?.toc
          )}
        </I18n.I18nProvider>
      </AppWrapper>
    );
  }, [slugStringified, locale, events]);

  return (
    <>
      <AnalyticsProvider instance={defaultAnalytics}>
        <Analytics />
      </AnalyticsProvider>
      <CacheProvider value={emotionCache}>
        <MediaProvider>
          <RecoilRoot>{componentWithLayout}</RecoilRoot>
        </MediaProvider>
      </CacheProvider>
    </>
  );
};

export default MillipedeApp;
