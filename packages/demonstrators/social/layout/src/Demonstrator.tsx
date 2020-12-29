import { useHoux } from '@app/houx';
import { reducers as demonstratorSharedReducers } from '@demonstrators-social/shared';
import { FC, useEffect } from 'react';

import { SocialApp } from './SocialApp';

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
    // <Container>
    //   <CollapseExpand>
    <SocialApp />
    //   </CollapseExpand>
    // </Container>
  );
};