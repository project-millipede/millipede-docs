import { PageTypes } from '@app/types';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon as MUIIcon } from '@material-ui/core';
import React, { FC } from 'react';

interface CustomIconProps {
  icon: PageTypes.Icon;
}

const generateFAIcon = (iconName: IconName) => {
  return <FontAwesomeIcon icon={iconName} />;
};

const generateMUIIcon = (iconName: string) => {
  return <MUIIcon>{iconName}</MUIIcon>;
};

const CustomIcon: FC<CustomIconProps> = ({ icon }) => {
  let iconPlaceholder: JSX.Element;

  if (icon.type === PageTypes.IconType.FA) {
    iconPlaceholder = generateFAIcon(icon.name as IconName);
  } else {
    iconPlaceholder = generateMUIIcon(icon.name);
  }

  return iconPlaceholder;
};

export default CustomIcon;
