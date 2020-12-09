import { useHoux } from '@app/houx';
import { CollapseExpand, Container } from '@demonstrator/layout';
import { reducers as demonstratorSharedReducers } from '@demonstrators-social/shared';
import dynamic from 'next/dynamic';
import React, { FC, useEffect } from 'react';

const DynamicSocialApp = dynamic(
  () => import('@demonstrators-social/layout').then(module => module.SocialApp),
  { loading: () => <p>Loading</p> }
);

export const Demonstrator: FC = () => {
  const {
    addReducer,
    removeReducer
  }: {
    addReducer: any;
    removeReducer: any;
  } = useHoux();

  useEffect(() => {
    addReducer({ ...demonstratorSharedReducers });
    return () => removeReducer('timeline');
  }, []);

  return (
    <Container>
      <CollapseExpand>
        <DynamicSocialApp />
      </CollapseExpand>
    </Container>
  );
};

export default Demonstrator;
