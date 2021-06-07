import { useHoux } from '@app/houx';
import { reducers as demonstratorSharedReducers } from '@demonstrators-social/shared';
import React, { FC, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import { App } from './App';

export const Demonstrator: FC = () => {
  const {
    addReducer,
    state
  }: // removeReducer
  {
    addReducer: any;
    // removeReducer: any;
    state;
  } = useHoux();

  useEffect(() => {
    if (state.timeline == null) {
      addReducer({ ...demonstratorSharedReducers });
    }
    return () => {
      // useResetRecoilState(timelineViewState);
      // useResetRecoilState(nodesWithRelationsWithEdgeState);
      // useResetRecoilState(refContainerScrollFromArcherState);
      // useResetRecoilState(refContainerScrollState);
      // useResetRecoilState(postIdsState);
      // useResetRecoilState(refPostScrollState);
      // useResetRecoilState(interactionOptionsState);
      // removeReducer('timeline');
    };
  }, []);

  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};
