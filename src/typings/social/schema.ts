import { UseCase, Timeline, Post, Vote, User, Comment } from '.';

type NormalizedEntity<Model, FK extends string> = Omit<Model, FK> &
  { [K in FK]: Array<number> };

type NormalizedEntities<E extends { [name: string]: [any, string] }> = {
  [Name in keyof E]?: {
    [id: string]: NormalizedEntity<E[Name][0], E[Name][1]>;
  };
};

export type UseCaseEntities = NormalizedEntities<{
  usecases: [UseCase, 'timelines'];
  timelines: [Timeline, 'owner' | 'posts'];
  posts: [Post, 'author' | 'comments' | 'votes'];
  votes: [Vote, 'voter'];
  comments: [Comment, 'commenter'];
  users: [User, never];
}>;

export type TimelineEntities = NormalizedEntities<{
  timelines: [Timeline, 'owner' | 'posts'];
  posts: [Post, 'author' | 'comments' | 'votes'];
  votes: [Vote, 'voter'];
  comments: [Comment, 'commenter'];
  users: [User, never];
}>;

export type PostEntities = NormalizedEntities<{
  posts: [Post, 'author' | 'comments' | 'votes'];
  votes: [Vote, 'voter'];
  comments: [Comment, 'commenter'];
  users: [User, never];
}>;
