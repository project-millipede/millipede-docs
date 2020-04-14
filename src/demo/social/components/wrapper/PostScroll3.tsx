import React, { FC, RefObject } from 'react';
import { useScrollPercentage } from 'react-scroll-percentage';

import Post, { PostProps } from '../Post';

interface ViewPortProps {
  inViewport: boolean;
  forwardedRef: RefObject<HTMLDivElement>;
}

interface InternalPostScroll3Props {
  index: number;
  parentElement?: Element;
}

export type PostScroll3Props = InternalPostScroll3Props &
  ViewPortProps &
  PostProps;

const PostScroll3: FC<PostScroll3Props> = props => {
  const [ref] = useScrollPercentage({
    root: props.parentElement
  });

  return (
    <div
      key={`ref-${props.timelineId}-${props.timelineId}-${props.index}}`}
      id={`ref-${props.timelineId}-${props.timelineId}-${props.index}}`}
      ref={ref}
    >
      <Post {...props} />
    </div>
  );
};

export default PostScroll3;
// const PostScroll3WithViewport = handleViewport(
//   PostScroll3 /** options: {}, config: {} **/
// );

// export default PostScroll3WithViewport;
