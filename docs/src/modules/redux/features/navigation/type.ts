export interface Page {
  pathname: string;
  title?: string;
  children?: Array<Page>;
  displayNav?: boolean;
  subheader?: string;
  icon?: string;
}
