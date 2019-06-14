import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface Page {
  pathname: string;
  title?: string;
  children?: Array<Page>;
  displayNav?: boolean;
  subheader?: string;
  icon?: React.ReactElement<SvgIconProps>;
}
