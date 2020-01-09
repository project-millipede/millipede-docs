import { Typography } from '@material-ui/core';
import { useHoux } from 'houx';
import { TFunction } from 'next-i18next-serverless';
import React from 'react';

import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { Szenario } from '../../../typings/animation';

interface AnimationHeadProps {
  t: TFunction;
}

const AnimationHead: React.FC<AnimationHeadProps> = ({ t }) => {
  const {
    state: {
      animation: { szenario }
    }
  }: {
    state: RootState;
  } = useHoux();

  let title = '';

  if (szenario === Szenario.Default) {
    title = t('buildingBlocks');
  }
  if (szenario === Szenario.Pet) {
    title = t('buildingBlocksPET');
  }
  if (szenario === Szenario.Pidp) {
    title = t('buildingBlocksPIDP');
  }

  return <Typography variant='h3'>{title}</Typography>;
};

export default AnimationHead;
