import { useHoux } from '@houx';
import React, { Dispatch, FC, RefObject, useEffect } from 'react';
import handleViewport from 'react-in-viewport';
import useMeasure from 'react-use-measure';

import { AnimationActions } from '../../../../../docs/src/modules/redux/features/actionType';
import { updateProgress } from '../../../../../docs/src/modules/redux/features/animation/actions';
import { RootState } from '../../../../../docs/src/modules/redux/reducers';
import Post, { PostProps } from '../Post';

interface ViewPortProps {
  inViewport: boolean;
  forwardedRef: RefObject<HTMLDivElement>;
}

interface InternalPostScrollProps {
  index: number;
}

export type PostScrollProps = InternalPostScrollProps &
  ViewPortProps &
  PostProps;

export const PostScroll: FC<PostScrollProps> = props => {
  const { index, inViewport, forwardedRef } = props;

  const {
    dispatch,
    state: {
      animation: { progress }
    }
  }: {
    dispatch: Dispatch<AnimationActions>;
    state: RootState;
  } = useHoux();

  const [ref, bounds] = useMeasure({ debounce: 250, scroll: true });

  useEffect(() => {
    if (progress[index] == null || bounds.y !== progress[index].y) {
      const progressToUpdate = {
        ...progress,
        [index]: bounds
      };
      dispatch(updateProgress(progressToUpdate));
    }
  }, [inViewport, bounds.y]);

  return (
    <div key={`ref-${index}`} id={`ref-${index}`} ref={ref}>
      {inViewport &&
      // && ref
      bounds ? (
        <div
          // ref={ref}
          style={{
            top: `${bounds.y - bounds.top}px`,
            bottom: `${bounds.y - bounds.bottom}px`,
            border: '1px solid #FF00FF',
            width: '50px'
          }}
        />
      ) : null}
      <div ref={forwardedRef}>
        <Post {...props} />
      </div>
    </div>
  );
};

const PostScrollWithViewport = handleViewport(
  PostScroll /** options: {}, config: {} * */
);

export default PostScrollWithViewport;
