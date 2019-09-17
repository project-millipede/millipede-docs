import { useHoux } from 'houx';

import { RootState } from '../redux/reducers';
import { pageToTitleI18n } from '../utils/helpers';

// import { useTranslation } from '../../../../i18n';

const usePageTitle = () => {
  const {
    state: {
      navigation: { activePage }
    }
  }: { state: RootState } = useHoux();

  if (!activePage) {
    throw new Error('Missing activePage.');
  }

  // const { t } = useTranslation();
  // const title = t(activePage.pathname);

  // const title = pageToTitleI18n(activePage, options.t);
  const title = pageToTitleI18n(activePage, undefined);

  return title;
};

export default usePageTitle;
