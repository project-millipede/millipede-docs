import { GridSize } from '@material-ui/core/Grid';

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

export interface TranslationProps {
  labelBack: string;
  labelNext: string;
}

export interface StepperProps {
  steps: number;
  step?: number;
  setStepCb: (step: number) => void;
}

export type MergedStepperProps = TranslationProps & StepperProps;

export type MergedStepperContentProps = TranslationProps & Stack;
