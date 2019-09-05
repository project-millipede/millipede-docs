import { useHoux } from 'houx';

import { RootState } from '../redux/reducers';
import { pageToTitleI18n } from '../utils/helpers';

// import { useTranslation } from '../../../../i18n';
interface PageTitleProps {
  children: (title: string) => JSX.Element;
}

const PageTitle = (props: PageTitleProps) => {
  const { state }: { state: RootState } = useHoux();

  // const { t } = useTranslation();

  if (!state.navigation) {
    throw new Error('Missing activePage.');
  }

  // const title = pageToTitleI18n(state.navigation.activePage, props.t);
  const title = pageToTitleI18n(state.navigation.activePage, undefined);

  // const title = t(state.navigation.activePage.pathname);

  return props.children(title);
};

export default PageTitle;
