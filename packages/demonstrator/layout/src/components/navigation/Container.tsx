import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';
import styled from 'styled-components';

import AnimationControls from './AnimationControls';
import AnimationHead from './AnimationHead';
import { DeviceControls, PrimaryAnimationControls, SecondaryAnimationControls } from './PrimaryAnimationControls';

const Root = styled.div``;

export const Container: FC = props => {
  const { t } = useTranslation();

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
