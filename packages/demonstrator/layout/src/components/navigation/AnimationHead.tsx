import { useHoux } from '@app/houx';
import { Szenario } from '@demonstrator/types';
import { Typography } from '@material-ui/core';
import { Translate } from 'next-translate';
import React, { FC } from 'react';

import { RootState } from '../../redux/features/reducers';

interface AnimationHeadProps {
  t: Translate;
}

const AnimationHead: FC<AnimationHeadProps> = ({ t }) => {
  const {
    state: {
      animation: { szenario }
    }
  }: {
    state: RootState;
  } = useHoux();

  let title = '';

  if (szenario === Szenario.Default) {
    title = t('pages/pidp/use-case/recognition/index:buildingBlocks');
  }
  if (szenario === Szenario.Pet) {
    title = t('pages/pidp/use-case/recognition/index:buildingBlocksPET');
  }
  if (szenario === Szenario.Pidp) {
    title = t('pages/pidp/use-case/recognition/index:buildingBlocksPIDP');
  }

  return <Typography variant='h3'>{title}</Typography>;
};

export default AnimationHead;