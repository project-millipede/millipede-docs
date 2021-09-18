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
  icon: Icon;
  children?: Array<Page>;
}

export type FlattenedPage = Omit<Page, 'children'> & { isParent?: boolean };

export interface ReadingTime {
  minutes: number;
  words: number;
  text: string;
}

export type ContentMetaData = {
  title?: string;
  description?: string;
  keywords?: string;
  hashtags?: string;
  author?: string;
  date?: string;
  timeToRead?: ReadingTime;
};

export type FunctionalMetaData = {
  disableToc?: boolean;
};

export type MetaData = ContentMetaData & FunctionalMetaData;
