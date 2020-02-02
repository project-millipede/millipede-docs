import React from 'react';
import styled from 'styled-components';

import { Screen } from '../components/constants';

import { ScrollWheel } from '../components';
import FooterView from '../device/browser/views/FooterView';
import Interface from '../interface';
import WindowProvider from '../services/window';

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  /* @media screen and (min-width: 750px) {
    height: 100vh;
    display: flex;
  } */

  /* width: 100%; */
`;

const Shell = styled('div')`
  width: 100%;
  position: relative;
  /* height: 100vh; */
  margin: auto;
  /* 
  max-height: 36.5em;
  width: 370px;
  border-radius: 30px;
  box-shadow: inset 0 0 2.4em #555;
  background: linear-gradient(180deg, #e3e3e3 0%, #d6d6d6 100%);
  -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, transparent), to(rgba(250, 250, 250, 0.3)));
  @media (prefers-color-scheme: dark) {
    box-shadow: inset 0 0 2.4em black;
  }
  ${Screen.SM} {
    @media screen and (max-height: 750px) {
      border-radius: 0;
      -webkit-box-reflect: unset;
    }
  } */
`;

const App: React.FC = () => {
  return (
    <Container>
      <WindowProvider>
        <Shell>
          <Interface />

          <ScrollWheel />
          <FooterView />
        </Shell>
      </WindowProvider>
    </Container>
  );
};

export default App;
