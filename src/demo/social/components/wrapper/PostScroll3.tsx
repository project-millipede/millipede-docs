import { useHoux } from 'houx';
import React, { FC, useEffect } from 'react';
import { useScrollPercentage } from 'react-scroll-percentage';

import { AnimationActions } from '../../../../../docs/src/modules/redux/features/actionType';
import { RootState } from '../../../../../docs/src/modules/redux/reducers';
import Post, { PostProps } from '../Post';

// import handleViewport from 'react-in-viewport';
interface ViewPortProps {
  inViewport: boolean;
  forwardedRef: React.RefObject<HTMLDivElement>;
}

interface InternalPostScroll3Props {
  index: number;
  parentElement?: Element;
}

export type PostScroll3Props = InternalPostScroll3Props &
  ViewPortProps &
  PostProps;

const PostScroll3: FC<PostScroll3Props> = props => {
  // export const PostScroll3: FC<PostScroll3Props> = ({
  //   index,
  //   // inViewport,
  //   // forwardedRef,
  //   parentElement
  // }) => {
  const {
    // dispatch,
    state: {
      // animation: { progress }
    }
  }: {
    dispatch: React.Dispatch<AnimationActions>;
    state: RootState;
  } = useHoux();

  // const [ref, bounds] = useMeasure({ debounce: 250, scroll: true });

  // useEffect(() => {
  //   if (progress[index] == null || bounds.y !== progress[index].y) {
  //     const progressToUpdate = {
  //       ...progress,
  //       [index]: bounds
  //     };
  //     dispatch(updateProgress(progressToUpdate));
  //   }
  // }, [inViewport, bounds.y]);

  const [ref, percentage] = useScrollPercentage({
    root: props.parentElement
  });

  useEffect(() => {
    if (props.index === 0) {
      console.log('index / percentage', `${props.index}-${percentage}`);
    }
  }, [percentage]);

  return (
    // <div key={`ref-${props.index}`} id={`ref-${props.index}`} ref={ref}>
    <div
      key={`ref-${props.timelineId}-${props.timelineId}-${props.index}}`}
      id={`ref-${props.timelineId}-${props.timelineId}-${props.index}}`}
      ref={ref}
    >
      {/* <div ref={forwardedRef}> */}
      <Post {...props} />
      {/* </div> */}
    </div>
  );
};

export default PostScroll3;
// const PostScroll3WithViewport = handleViewport(
//   PostScroll3 /** options: {}, config: {} **/
// );

// export default PostScroll3WithViewport;
