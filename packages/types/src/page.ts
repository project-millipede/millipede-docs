export enum IconType {
  MUI = 'MUI',
  FA = 'FA'
}

export interface Icon {
  type: IconType;
  name: string;
}

export interface Page {
  pathname: string;
  icon?: Icon;
  title?: string;
  children?: Array<Page>;
}

export type FlattenedPage = Omit<Page, 'children'> & { isParent?: boolean };

export interface ReadingTime {
  minutes: number;
  words: number;
  text: string;
}

export type PageMetaData = {
  title?: string;
  description?: string;
  author?: string;
  date?: string;
  keywords?: string;
  editedAt?: string;
  timeToRead?: ReadingTime;
};

export type BlogMetaData = {
  blurb?: string;
};

export type ShareMetaData = {
  hashTags?: string;
};

export type MetaData = PageMetaData & BlogMetaData & ShareMetaData;
