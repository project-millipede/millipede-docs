import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TimelineActions } from '../../../../docs/src/modules/redux/features/actionType';
import { createComment, removePost } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { factories } from '../../../data/social';
import { Comment, Content, User } from '../../../typings/social';

const { contentCommentFactory, currentTimeStampFactory } = factories;

export const handleCreateComment = async (
  owner: User,
  postId: string,
  text: string,
  dispatch: Dispatch<TimelineActions>,
  callback: (value: Comment) => void
) => {
  const content: Content = {
    ...(await contentCommentFactory.combine(currentTimeStampFactory).build()),
    text
  };

  const comment: Comment = {
    id: uuidv4(),
    commenter: owner,
    content
  };

  dispatch(createComment(postId, comment));
  callback(comment);
};

export const handleDeletePost = (
  timelineId: string,
  postId: string,
  dispatch: Dispatch<TimelineActions>
) => {
  dispatch(removePost(timelineId, postId));
};

// export const handleDeletePost = (
//   postId: string,
//   dispatch: Dispatch<TimelineActions>
// ) => {
//   dispatch(removePost(postId));
// };
