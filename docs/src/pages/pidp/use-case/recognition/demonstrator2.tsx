// import React from 'react';

// import App from '../../../../../../src/components/app';

// export const Demonstrator2 = () => {
//   return <App />;
// };

// export default Demonstrator2;

import React from 'react';
import { isBrowser } from 'react-device-detect';

import { Container } from '../../../../../../src/components/animation/components/Container';
import { CollapseExpand } from '../../../../../../src/components/animation/framer/components/container/CollapseExpand';
import {
  ContentView,
  FooterView,
  HeaderView
} from '../../../../../../src/components/device/browser/views';
import Post from '../../../../../../src/demo/social/components/Post';
import SocialApp from '../../../../../../src/demo/social/components/SocialApp';
import App from '../../../../../../src/components/app';

export const Demonstrator = () => {
  return (
    <>
      <Container>
        <CollapseExpand>
          {isBrowser ? <HeaderView /> : null}
          <ContentView>
            <SocialApp id={`content-${1}`} Comp={Post} />
          </ContentView>
          <FooterView />
        </CollapseExpand>
      </Container>

      <App />
    </>
  );
};

export default Demonstrator;
