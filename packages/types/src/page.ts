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
  children?: Array<Page>;
}
