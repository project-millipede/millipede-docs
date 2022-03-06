import { Navigation } from '@app/types';
import { GetStaticPropsContext } from 'next';

import { getBlogNavigation, getNavigation } from './getNavigation';

export interface GetStaticNavigationProps {
  navigation: Navigation;
}

interface GetStaticNavigationPropsOptions {
  pageType: string;
  onSuccess?: (navigation: Navigation) => void;
}

export const getStaticNavigationProps =
  ({ pageType, onSuccess }: GetStaticNavigationPropsOptions) =>
  async (ctx: GetStaticPropsContext) => {
    let navigation: Navigation;
    if (pageType === 'docs') {
      navigation = await getNavigation(ctx);
    } else if (pageType === 'blog') {
      navigation = await getBlogNavigation(ctx, pageType);
    }
    if (navigation && onSuccess) {
      onSuccess(navigation);
    }
    return {
      props: {
        navigation
      }
    };
  };
