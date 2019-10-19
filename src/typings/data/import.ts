import { GridSize } from '@material-ui/core/Grid';

export interface Page {
  pathname: string;
  title?: string;
  children?: Array<Page>;
  displayNav?: boolean;
  subheader?: string;
  icon?: string;
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
  listing?: Array<string>;
  summary?: Array<string>;
  note?: Array<string>;
}

export interface Slice {
  title?: string;
  subTitle?: string;
  description?: string | Array<Description>;
  image?: JSX.Element;
}

export type Content = Allocation & Slice;

export interface Stack {
  elements?: Array<Content>;
  rows?: Array<Array<Content>>;
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

export interface OverviewProps {
  title?: string;
  description?: string;
  letter: Array<string>;
  link: string;
  steps: Array<OverviewStep>;
}
