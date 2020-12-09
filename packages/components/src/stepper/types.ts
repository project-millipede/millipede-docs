// borrowed from mui
type GridSize = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Link {
  text: string;
  link: string;
}

interface Description {
  title?: Array<string>;
  subTitle?: Array<string>;
  text?: Array<string>;
  listing?: Array<Link>;
  summary?: Array<string>;
  note?: Array<string>;
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
interface CategoryDescriptor {
  [category: string]: Descriptor;
}

export interface Stack {
  elements?: Array<Content>;
  rows?: Array<Array<Content>>;
  categories?: CategoryDescriptor;
}
