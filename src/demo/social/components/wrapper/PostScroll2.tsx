import { useHoux } from 'houx';
import React, { FC, useEffect } from 'react';
import useMeasure from 'react-use-measure';

import { AnimationActions } from '../../../../../docs/src/modules/redux/features/actionType';
import { updateProgress } from '../../../../../docs/src/modules/redux/features/animation/actions';
import { RootState } from '../../../../../docs/src/modules/redux/reducers';
import Post, { PostProps } from '../Post';

// interface ViewPortProps {
//   inViewport: boolean;
//   forwardedRef: React.RefObject<HTMLDivElement>;
// }

interface InternalPostScroll2Props {
  index: number;
}

export type PostScroll2Props = InternalPostScroll2Props & PostProps;

// interface OffSet {
//   offsetTop: number;
//   offsetBottom: number;
// }

export const PostScroll2: FC<PostScroll2Props> = props => {
  const { index } = props;
  const {
    dispatch,
    state: {
      animation: {
        progress
        // progressViewport
      }
    }
  }: {
    dispatch: React.Dispatch<AnimationActions>;
    state: RootState;
  } = useHoux();

  // const outerRef = React.useRef(null);
  // useRectEffect(
  //   rect => {
  //     if (
  //       progressViewport[index] == null ||
  //       rect.top !== progressViewport[index].top
  //     ) {
  //       // const progressViewportToUpdate = {
  //       //   ...progressViewport,
  //       //   [index]: rect
  //       // };
  //       // dispatch(setProgressViewport(progressViewportToUpdate));
  //       dispatch(setProgressViewport(index, rect));
  //     }
  //   },
  //   outerRef,
  //   {
  //     deferUpdateUntilIdle: true,
  //     priority: 'low'
  //   }
  // );

  // const rect = useRect(outerRef, {
  //   deferUpdateUntilIdle: true,
  //   priority: 'low'
  // });

  // useViewportEffect(
  //   viewport => {
  //     if (index === 0) {
  //       console.log(viewport);
  //     }
  //   },
  //   { deferUpdateUntilIdle: true, priority: 'low' }
  // );

  // const offset = useLayoutSnapshot<OffSet>(({ scroll }) => {
  //   if (index === 0) {
  //     if (!outerRef.current) {
  //       return { offsetTop: 0, offsetBottom: 0 };
  //     }
  //     return {
  //       offsetTop: outerRef.current.getBoundingClientRect().top + scroll.y,
  //       offsetBottom: outerRef.current.getBoundingClientRect().bottom - scroll.y
  //     };
  //   }
  // });

  // const offset = useLayoutSnapshot<OffSet>(({ scroll }) => {
  //   if (index === 0) {
  //     if (outerRef && outerRef.current) {
  //       return {
  //         offsetTop: outerRef.current.getBoundingClientRect().top + scroll.y,
  //         offsetBottom:
  //           outerRef.current.getBoundingClientRect().bottom - scroll.y
  //       };
  //     }
  //   }
  // });

  // if (index === 0 && offset) {
  //   console.log('hook:layout snapshot - offsetTop', offset.offsetTop);
  //   console.log('hook:layout snapshot - offsetBottom', offset.offsetBottom);
  // }

  const [ref, bounds] = useMeasure({ debounce: 250, scroll: true });

  useEffect(() => {
    if (progress[index] == null || bounds.y !== progress[index].y) {
      const progressToUpdate = {
        ...progress,
        [index]: bounds
      };
      dispatch(updateProgress(progressToUpdate));
    }
  }, [bounds.y]);

  // <div key={`outerRef-${index}`} id={`outerRef-${index}`} ref={outerRef}></div>
  return (
    <>
      {bounds ? (
        <div
          ref={ref}
          style={{
            top: `${bounds.y - bounds.top}px`,
            bottom: `${bounds.y - bounds.bottom}px`,
            border: '1px solid #FF00FF',
            width: '50px'
          }}
        ></div>
      ) : null}
      <Post {...props} />
    </>
  );
};

export default PostScroll2;
