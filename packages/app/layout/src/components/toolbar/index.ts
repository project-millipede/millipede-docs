import { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar';

export { SwitchAppToolBar } from './SwitchAppToolBar';
export interface AppBarProps extends MuiAppBarProps {
  isDrawerExpanded?: boolean;
  handleDrawerOpen?: () => void;
}
