import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FolderIcon from '@material-ui/icons/Folder';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RestoreIcon from '@material-ui/icons/Restore';
import React, { ChangeEvent, FC, useState } from 'react';

import { BottomRevealMin } from '../../../animation/framer/components/container/BottomRevealMin';

const FooterView: FC = () => {
  const [value, setValue] = useState('recents');

  const handleChange = (_event: ChangeEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomRevealMin id={`header-${1}`} toggle={true}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label='Recents'
          value='recents'
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label='Favorites'
          value='favorites'
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label='Nearby'
          value='nearby'
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label='Folder'
          value='folder'
          icon={<FolderIcon />}
        />
      </BottomNavigation>
    </BottomRevealMin>
  );
};

export default FooterView;
