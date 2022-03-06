import { PageTypes } from '.';

export interface Navigation {
  pages: Array<PageTypes.Page>;
  flattenedPages?: Array<PageTypes.FlattenedPage>;
  activePage: PageTypes.FlattenedPage;
  expandedPages: Array<string>;
  pageType: string;
}
