import { PageTypes } from '@app/types';

export interface NavigationState {
  pages: Array<PageTypes.Page>;
  flattenedPages?: Array<PageTypes.FlattenedPage>;
  activePage: PageTypes.FlattenedPage;
  expandedPages: Array<string>;
}
