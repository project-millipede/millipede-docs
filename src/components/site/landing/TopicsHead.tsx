import { Button, Container as MUIContainer } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import _ from 'lodash';
import { TFunction } from 'next-i18next-serverless';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../../i18n';
import { OverviewProps } from '../../../typings/data/import';
import { TopReveal } from '../../animation/framer/components/text/TopReveal';
import FullScreenInterface from '../../interface/FullScreenInterfaceByComponent';

// import Grid from '@material-ui/core/Grid';
export const Container = styled('div')`
  position: relative;
  /* height: 480px; */
  overflow: hidden;
  background: white;
  /* animation: fadeFromBlack 0s; */
  /* @keyframes fadeFromBlack {
    0% {
      filter: brightness(0);
    }
  } */
`;

/** Prevents the user from scrolling the display with a mouse. */

export const Mask = styled('div')`
  /* z-index: 100; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      marginTop: '48px'
    }
  })
);

const generateTopics = (t: TFunction): Array<OverviewProps> => {
  const topics: Array<OverviewProps> = t('topics', { returnObjects: true });
  if (_.isArray(topics)) {
    return topics;
  }
  return [];
};

export const renderTopics = (
  topics: Array<OverviewProps>,
  outerIndex: number
) => {
  return topics.length > 0
    ? topics.map((topic, index) => {
        return (
          <TopReveal
            id={`animation-${index}`}
            text={[...topic.title, ...topic.subTitle]}
            outerIndex={outerIndex}
          />
        );
      })
    : null;
};

const ns = 'pages/topics/index';

const TopicsHead = () => {
  const { t } = useTranslation(ns);

  // const classes = useStyles({});

  const [outerIndex, setOuterIndex] = useState(0);

  const topics = generateTopics(t);

  // return (
  //   <MUIContainer style={{ margin: '32px' }}>
  //     {/* <MUIContainer style={{ paddingLeft: '0px', paddingRight: '0px' }}> */}
  //     <Container>
  //       <Mask />
  //       <FullScreenInterface
  //         windowStackData={topics || []}
  //         index={outerIndex}
  //       />
  //     </Container>
  //     <div style={{ display: 'flex' }}>
  //       <Button
  //         onClick={() => {
  //           setOuterIndex(0);
  //         }}
  //       >
  //         set to 0
  //       </Button>

  //       <Button
  //         onClick={() => {
  //           setOuterIndex(1);
  //         }}
  //       >
  //         set to 1
  //       </Button>
  //     </div>
  //   </MUIContainer>
  // );

  return (
    <MUIContainer style={{ paddingLeft: '0px', paddingRight: '0px' }}>
      <Container>
        <Mask />
        <FullScreenInterface
          windowStackData={topics || []}
          index={outerIndex}
        />
      </Container>

      <MUIContainer style={{ paddingLeft: '0px', paddingRight: '0px' }}>
        <Button
          onClick={() => {
            setOuterIndex(0);
          }}
        >
          set to 0
        </Button>

        <Button
          onClick={() => {
            setOuterIndex(1);
          }}
        >
          set to 1
        </Button>

        <Button
          onClick={() => {
            setOuterIndex(2);
          }}
        >
          set to 2
        </Button>
      </MUIContainer>
    </MUIContainer>
  );
};

export default TopicsHead;
