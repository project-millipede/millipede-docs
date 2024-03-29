import { Icon } from './page';

export type GridSize =
  | 'auto'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

interface Link {
  text: string;
  link: string;
}

interface Description {
  subTitle: Array<string>;
  text?: Array<string>; // only in comparison, Description gets used on serveral places with differen context such as landing
  listing: Array<Link>;
  summary: Array<string>;
  note: Array<string>;
}

interface Slice {
  title?: string;
  subTitle?: string;
  description?: string | Array<Description>;
  image?: JSX.Element;
}

interface Allocation {
  step: number;
  size: GridSize;
}

export type Content = Allocation & Slice;

interface Descriptor {
  id: string;
  title: string;
  step: number;
}

export interface CategoryDescriptor {
  [category: string]: Descriptor;
}

export interface Section {
  id: string;
  icon: Icon;
}

export interface OverviewProps {
  id: string;
  scenario?: string;
  category?: string;
  title: string;
  link: string;
  icon: Icon;
  description: Array<Description>;
}

export interface Topic {
  id: string;
  title: Array<string> | string;
  subTitle: Array<string> | string;
  sections: Array<Section>;
}

export interface Category {
  [category: string]: Array<OverviewProps>;
}

export interface Scenario {
  [szenario: string]: Category;
}
export interface Stack {
  // elements?: Array<Content> | Category;
  elements?: Array<Content>;
  rows?: Array<Array<Content>>;
  categories?: CategoryDescriptor;
}
