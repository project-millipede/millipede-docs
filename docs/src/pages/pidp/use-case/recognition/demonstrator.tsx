import React, { FC } from 'react';

import { Container } from '../../../../../../src/components/animation/components/Container';
import { CollapseExpand } from '../../../../../../src/components/animation/framer/components/container/CollapseExpand';
import { SocialApp } from '../../../../../../src/demo/social/components/SocialApp';

export const Demonstrator: FC = () => {
  return (
    <Container>
      <CollapseExpand>
        <SocialApp />
      </CollapseExpand>
    </Container>
  );
};

export default Demonstrator;
