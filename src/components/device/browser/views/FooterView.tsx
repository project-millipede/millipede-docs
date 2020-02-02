import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import TimelineIcon from '@material-ui/icons/Timeline';
import React, { useState } from 'react';
import { TimelineView, ElementsView } from '../../../app/views';
import { PREVIEW } from '../../../app/previews/Preview';

import { useWindowService } from '../../../services/window';
import { ViewOptions } from '../../../app/views/ViewOptions';

import { BottomRevealMin } from '../../../animation/framer/components/container/BottomRevealMin';
import { SelectableListOption } from '../../../components/selectableList/SelectableListOption';

export interface FooterViewProps {}

const FooterView: React.FC<FooterViewProps> = () => {
  const [value] = React.useState('recents');

  const initialOptions: Array<SelectableListOption> = [
    // {
    //   label: 'Cover Flow',
    //   value: () => <CoverFlowView />,
    //   viewId: ViewOptions.coverFlow.id,
    //   preview: PREVIEW.MUSIC
    // },
    // Setup view
    {
      label: 'Music',
      // value: () => <MusicView />,
      value: () => <TimelineView />,
      viewId: ViewOptions.music.id,
      preview: PREVIEW.MUSIC
    },
    {
      label: 'Settings',
      // value: () => <SettingsView />,
      value: () => <ElementsView />,
      viewId: ViewOptions.settings.id,
      preview: PREVIEW.SETTINGS
    }
  ];

  const [options] = useState(initialOptions);

  const { windowStack, showWindow } = useWindowService();

  console.log('windowStack: ', windowStack);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    // const isActive = windowStack[windowStack.length - 1].id === newValue;

    const option = options[newValue];
    // if (!isActive || !option) return;

    if (option.viewId) {
      const View = option.value;
      const viewOptions = ViewOptions[option.viewId];

      showWindow({
        type: viewOptions.type,
        id: option.viewId,
        component: View
      });
    }

    // setValue(newValue);
  };

  return (
    <BottomRevealMin id={`header-${1}`} toggle={true}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label='Timeline'
          value={0}
          icon={<TimelineIcon />}
        />
        <BottomNavigationAction
          label='Data synchronisation'
          value={1}
          icon={<SyncIcon />}
        />
        <BottomNavigationAction
          label='Timeline enhanced'
          value={2}
          icon={<TimelineIcon />}
        />
      </BottomNavigation>
    </BottomRevealMin>
  );
};

export default FooterView;
