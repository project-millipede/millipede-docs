import { useHoux } from 'houx';
import React from 'react';

import { RootState } from '../../../../../docs/src/modules/redux/reducers';

// import InteractionIndicatorSimple from './InteractionIndicatorSimple';

const PetDescription = () => {
  const {
    state: {
      animation: { progress }
    }
  }: {
    state: RootState;
  } = useHoux();

  return (
    <>
      <div>Pet Description</div>
      {Object.values(progress).map((value, index) => {
        return <div>{`indicator-${index} - ${value.y}`}</div>;
      })}
      {/* <InteractionIndicatorSimple /> */}
    </>
  );
};

export default PetDescription;
