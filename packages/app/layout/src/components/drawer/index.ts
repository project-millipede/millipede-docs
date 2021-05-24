export { MobileDrawer } from './MobileDrawer';
export { DesktopDrawer } from './DesktopDrawer';
export { SwitchDrawer } from './SwitchDrawer';
export interface DrawerProps {
  isDrawerExpanded: boolean;
  handleDrawerOpen?: () => void;
  handleDrawerClose: () => void;
}
