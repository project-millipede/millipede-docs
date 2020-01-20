import {
  denormalize as denormalizeFn,
  normalize as normalizeFn,
  schema
} from 'normalizr';
import {
  User,
  Vote,
  Post,
  Timeline,
  UseCase,
  Comment
} from '../../typings/social';

export const enum TimelineSchemaKeys {
  usecases = 'usecases',
  timelines = 'timelines',
  posts = 'posts',
  votes = 'votes',
  comments = 'comments',
  users = 'users'
}

export const userSchema = new schema.Entity<User>(TimelineSchemaKeys.users);

export const commentSchema = new schema.Entity<Comment>(
  TimelineSchemaKeys.comments,
  {
    commenter: userSchema
  }
);

export const voteSchema = new schema.Entity<Vote>(TimelineSchemaKeys.votes, {
  voter: userSchema
});

export const postSchema = new schema.Entity<Post>(TimelineSchemaKeys.posts, {
  author: userSchema,
  comments: [commentSchema],
  votes: [voteSchema]
});

export const timelineSchema = new schema.Entity<Timeline>(
  TimelineSchemaKeys.timelines,
  {
    owner: userSchema,
    posts: [postSchema]
  }
);

export const useCaseSchema = new schema.Entity<UseCase>(
  TimelineSchemaKeys.usecases,
  { timelines: [timelineSchema] },
  { idAttribute: 'id' }
);

export const normalizeWrapper = <E>(data, dataSchema) => {
  return normalizeFn<any, E, any>(data, dataSchema);
};

export const denormalizeWrapper = (result, dataSchema, entities) => {
  return denormalizeFn(result, dataSchema, entities);
};
