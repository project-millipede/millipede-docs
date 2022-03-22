import { PageTypes } from '@app/types';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { getIconByName } from './Icon.svc';

interface CustomIconProps {
  icon: PageTypes.Icon;
}

const generateFAIcon = (iconName: IconName) => {
  return <FontAwesomeIcon icon={iconName} />;
};

const generateMUIIcon = (iconName: string) => {
  return getIconByName(iconName);
};

export const CustomIcon: FC<CustomIconProps> = ({ icon }) => {
  if (icon.type === PageTypes.IconType.FA) {
    return generateFAIcon(icon.name as IconName);
  }
  return generateMUIIcon(icon.name);
};
