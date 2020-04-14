import React, { FC } from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../../i18n';
import AnimationControls from './AnimationControls';
import AnimationHead from './AnimationHead';
import { DeviceControls, PrimaryAnimationControls, SecondaryAnimationControls } from './PrimaryAnimationControls';

const Root = styled('div')``;

const ns = 'pages/pidp/use-case/recognition/index';

export const Container: FC = props => {
  const { t } = useTranslation(ns);

  return (
    <Root>
      <AnimationControls
        primaryControls={<PrimaryAnimationControls t={t} />}
        secondaryControls={<SecondaryAnimationControls t={t} />}
        deviceControls={<DeviceControls t={t} />}
      />
      <AnimationHead t={t} />
      {props.children}
    </Root>
  );
};
