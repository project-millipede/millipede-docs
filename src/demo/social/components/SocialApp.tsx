import { useHoux } from '@houx';
import React, { Dispatch, FC, useCallback, useEffect } from 'react';
import { isBrowser } from 'react-device-detect';
import SwipeableViews from 'react-swipeable-views';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { normalizeData } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { generateData } from '../../../data/social/mocks';
import { Area, Device, Szenario } from '../../../typings/animation';
import { UseCase } from '../../../typings/social';
import ElementDescription from './aspects/ElementDescription';
import PetDescription from './aspects/PetDescription';
import PidpDescription from './aspects/PidpDescription';
import { PostProps } from './Post';
import Timeline from './Timeline';

export interface SocialAppProps {
  id: string;
  fontColor?: string;

  // input parameters for height calculation
  lineGap?: number;
  fontSize?: number;

  // animation property
  stagger?: number;
  loop?: boolean;

  Comp: FC<PostProps>;
}

const styles = {
  root: {
    padding: '0 30px'
  },
  slideContainer: {
    padding: '0 10px'
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff'
  },
  slide1: {
    backgroundColor: '#FEA900'
  },
  slide2: {
    backgroundColor: '#B3DC4A'
  },
  slide3: {
    backgroundColor: '#6AC0FF'
  }
};

const SocialApp = (props: SocialAppProps) => {
  const { Comp } = props;

  const {
    state: {
      animation: { szenario, device, area },
      timeline: {
        entities: { usecases },
        result
      }
    },
    dispatch
  }: {
    state: RootState;
    dispatch: Dispatch<TimelineActions>;
  } = useHoux();

  const loadPosts = useCallback(async () => {
    return generateData();
  }, []);

  const normalizePosts = useCallback((usecaseData: UseCase) => {
    dispatch(normalizeData(usecaseData));
  }, []);

  useEffect(() => {
    const onBoardContent = async () => {
      const data = await loadPosts();
      await normalizePosts(data);
    };
    onBoardContent();
  }, [generateData]);

  return isBrowser ? (
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          flex: device === Device.Desktop ? '0 0 30%' : '0 0 50%'
        }}
      >
        <Timeline
          timelineId={usecases && result ? usecases[result].timelines[0] : 0}
          Comp={Comp}
        />
      </div>
      <div
        style={{
          maxHeight: area === Area.Global ? '800px' : 'unset',
          overflowY: area === Area.Global ? 'auto' : 'unset',
          flex: device === Device.Desktop ? '0 0 40%' : '0 0 50%'
        }}
      >
        {szenario === Szenario.Default ? <ElementDescription /> : null}
        {szenario === Szenario.Pet ? <PetDescription /> : null}
        {szenario === Szenario.Pidp ? <PidpDescription /> : null}
      </div>
      {device === Device.Desktop ? (
        <div
          style={{
            flex: device === Device.Desktop ? '0 0 30%' : '0 0 50%'
          }}
        >
          <Timeline
            timelineId={usecases && result ? usecases[result].timelines[1] : 1}
            Comp={Comp}
          />
        </div>
      ) : null}
    </div>
  ) : (
    <SwipeableViews style={styles.root} slideStyle={styles.slideContainer}>
      <div style={{ ...styles.slide, ...styles.slide1 }}>
        <Timeline
          timelineId={usecases && result ? usecases[result].timelines[0] : 0}
          Comp={Comp}
        />
      </div>
      <div style={{ ...styles.slide, ...styles.slide2 }}>
        {szenario === Szenario.Default ? <ElementDescription /> : null}
        {szenario === Szenario.Pet ? <PetDescription /> : null}
        {szenario === Szenario.Pidp ? <PidpDescription /> : null}
      </div>
      <div style={{ ...styles.slide, ...styles.slide3 }}>
        <Timeline
          timelineId={usecases && result ? usecases[result].timelines[1] : 1}
          Comp={Comp}
        />
      </div>
    </SwipeableViews>
  );
};

export default SocialApp;
