import { factories, Types } from '@demonstrators-social/data';
import { actions, TimelineActions } from '@demonstrators-social/shared';
import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { contentCommentFactory, currentTimeStampFactory } = factories;

export const handleCreateComment = async (
  owner: Types.User,
  postId: string,
  text: string,
  dispatch: Dispatch<TimelineActions>,
  callback: (value: Types.Comment) => void
) => {
  const content: Types.Content = {
    ...(await contentCommentFactory.combine(currentTimeStampFactory).build()),
    text
  };

  const comment: Types.Comment = {
    id: uuidv4(),
    commenter: owner,
    content
  };

  dispatch(actions.timeline.createComment(postId, comment));
  callback(comment);
};

export const handleDeletePost = (
  timelineId: string,
  postId: string,
  dispatch: Dispatch<TimelineActions>
) => {
  dispatch(actions.timeline.removePost(timelineId, postId));
};

// export const handleDeletePost = (
//   postId: string,
//   dispatch: Dispatch<TimelineActions>
// ) => {
//   dispatch(removePost(postId));
// };
