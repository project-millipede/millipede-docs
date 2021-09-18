import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { GetStaticPropsContext } from 'next';

import { getNavigation } from './getNavigation';

export interface GetStaticNavigationProps {
  navigation: NavigationState;
}

interface GetStaticContentPropsOptions {
  onSuccess: (navigation: GetStaticNavigationProps) => void;
}

export const getStaticNavigationProps =
  ({ onSuccess }: GetStaticContentPropsOptions) =>
  async (ctx: GetStaticPropsContext) => {
    const navigation = await getNavigation(ctx);

    if (navigation && onSuccess) {
      onSuccess(navigation as any);
    }

    return {
      props: {
        ...navigation
      }
    };
  };
