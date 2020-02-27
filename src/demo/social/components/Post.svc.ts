import { TimelineActions } from 'docs/src/modules/redux/features/actionType';
import { v4 as uuidv4 } from 'uuid';

import { createComment, removePost } from '../../../../docs/src/modules/redux/features/timeline/actions';
import { factories, schema } from '../../../data/social';
import { Comment, Post } from '../../../typings/social';
import { UseCaseEntities } from '../../../typings/social/schema';

const { contentFactory, currentTimeStampFactory } = factories;
const { denormalizeWrapper, timelineSchema } = schema;

export const selectPost = (
  postId: number,
  entities: Partial<UseCaseEntities>
) => {
  let post: Post = {
    id: 0,
    author: { id: 0, profile: { firstName: '', lastName: '' } },
    content: {
      id: 0,
      createdAt: '',
      updatedAt: '',
      text: '',
      title: '',
      media: { id: uuidv4(), imageTitle: '', imageHref: '' }
    },
    comments: [],
    votes: []
  };

  if (entities && postId) {
    const { posts, users, comments } = entities;

    const userId = (posts[postId].author as unknown) as number;
    const commentIds = posts[postId].comments;

    const commentsLoaded = commentIds.map((commentId: number) => {
      const commenterId = (comments[commentId].commenter as unknown) as number;
      const commenter = users[commenterId] || {
        id: 0,
        profile: { firstName: '', lastName: '' }
      };

      return {
        ...comments[commentId],
        commenter
      };
    });

    post = {
      ...posts[postId],
      // author: users[post.author[0]]
      author: users[userId] || {
        id: 0,
        profile: { firstName: '', lastName: '' }
      },
      comments: commentsLoaded,
      votes: []
    };
  }

  return post;
};

export const handleCreateComment = (
  timelineId: number,
  postId: number,
  text: string,
  entities: Partial<UseCaseEntities>,
  dispatch: React.Dispatch<TimelineActions>,
  callback: () => void = () => ({})
) => {
  const denormalizedTimeline = denormalizeWrapper(
    timelineId,
    timelineSchema,
    entities
  );

  const commentTemplate: Comment = {
    id: uuidv4(),

    commenter: { id: -1 },
    content: contentFactory.combine(currentTimeStampFactory).build()
  };

  const comment: Comment = {
    ...commentTemplate,
    commenter: denormalizedTimeline.owner,
    content: {
      ...commentTemplate.content,
      text
    }
  };

  dispatch(createComment(postId, comment));
  callback();
};

export const handleDeletePost = (
  timelineId: number,
  postId: number,
  dispatch: React.Dispatch<TimelineActions>,
  callback: () => void = () => ({})
) => {
  dispatch(removePost(timelineId, postId));
  callback();
};
