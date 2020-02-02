import React from 'react';

import AboutView from '../aboutView';
import { ViewOptions } from '../ViewOptions';

import { SelectableList } from '../../../components/selectableList';

import { SelectableListOption } from '../../../components/selectableList/SelectableListOption';

import { useMenuHideWindow, useScrollHandler } from '../../../hooks';

const SettingsView = () => {
  useMenuHideWindow(ViewOptions.settings.id);
  const options: Array<SelectableListOption> = [
    {
      label: 'About',
      value: () => <AboutView />,
      viewId: ViewOptions.about.id
    }
  ];

  const [index] = useScrollHandler(ViewOptions.settings.id, options);

  return <SelectableList options={options} activeIndex={index} />;
};

export default SettingsView;
