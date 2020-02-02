import React from 'react';

import { ViewOptions } from '../ViewOptions';
import ElementDescription from '../../../../demo/social/components/aspects/ElementDescription';
import { useMenuHideWindow } from '../../../hooks';

const ElementsView = () => {
  useMenuHideWindow(ViewOptions.settings.id);

  return <ElementDescription />;
};

export default ElementsView;
