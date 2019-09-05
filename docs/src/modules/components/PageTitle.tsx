import { useHoux } from 'houx';

import { RootState } from '../redux/reducers';
import { pageToTitleI18n } from '../utils/helpers';

interface PageTitleProps {
  children: (title: string) => JSX.Element;
  // t?: (title: string) => string;
}

const PageTitle = (props: PageTitleProps) => {
  const { state }: { state: RootState } = useHoux();

  if (!state.navigation) {
    throw new Error('Missing activePage.');
  }

  // const title = pageToTitleI18n(state.navigation.activePage, props.t);
  const title = pageToTitleI18n(state.navigation.activePage, undefined);

  return props.children(title);
};

export default PageTitle;
