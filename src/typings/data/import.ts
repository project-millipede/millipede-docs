import { GridSize } from '@material-ui/core/Grid';

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
  title?: string;
  children?: Array<Page>;
  displayNav?: boolean;
  subheader?: string;
  icon?: Icon;
  highlight?: boolean;
}

export interface Allocation {
  step: number;
  size: GridSize;
}

export interface Description {
  title?: Array<string>;
  subTitle?: Array<string>;
  text?: Array<string>;
  listing?: Array<Link>;
  summary?: Array<string>;
  note?: Array<string>;
}

export interface Link {
  text: string;
  link: string;
}

export interface Slice {
  title?: string;
  subTitle?: string;
  description?: string | Array<Description>;
  image?: JSX.Element;
}

export type Content = Allocation & Slice;

export interface Stack {
  elements?: Array<Content> | Category;
  rows?: Array<Array<Content>>;
  categories?: CategoryDescriptor;
}

export interface Stack2 {
  elements?: Category;
  rows?: Array<Array<Content>>;
  categories?: CategoryDescriptor;
}

export interface Category {
  [category: string]: Array<OverviewProps>;
}

export interface Scenario {
  [szenario: string]: Category;
}

export interface Descriptor {
  id: string;
  title: string;
  step: number;
}
export interface CategoryDescriptor {
  [category: string]: Descriptor;
}

// TO be done

export interface OverviewSlice {
  letter: Array<string>;
  link: string;
}

export interface OverviewStep {
  label: string;
  imgPath?: string;
}

export interface Section {
  type: 'string';
  icon: Icon;
}

export interface ContextLink {
  id: string;
  perspectives: Array<Section>;
}

export interface OverviewProps {
  title?: Array<string> | string;
  subTitle?: Array<string> | string;
  description?: Array<Description>;
  letter?: Array<string>;
  link?: string;
  steps?: Array<OverviewStep>;
  scenario?: string;
  category?: string;
  icon?: string;
  order?: number;
  userFocus?: number;
  contextLink?: ContextLink;
}
