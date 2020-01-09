import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import * as Factory from 'factory.ts';
import faker from 'faker';
import { denormalize as denormalizeFn, normalize as normalizeFn, schema } from 'normalizr';

export const enum TimelineSchemaKeys {
  usecases = 'usecases',
  timelines = 'timelines',
  posts = 'posts',
  votes = 'votes',
  comments = 'comments',
  users = 'users'
}

export interface UseCase {
  id: number;
  timelines: Array<Timeline>;
}

export interface Timeline {
  id: number;
  owner: User;

  // right now, posts reflect posts from other users and those from the timeline owner
  posts: Array<Post>;
}

// Top tier model
export interface Post {
  id: number;
  author: User;
  content: Content;
  comments: Array<Comment>;
  votes?: Array<Vote>;
}

// Second tier model

// => Post

export interface User {
  id: number;
  profile?: Profile;
}

export interface Content {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  text: string;
  media?: Media;
}

// third tier model

// => User
export interface Profile {
  firstName: string;
  lastName: string;
  userName?: string;
  avatar?: string;
}

// => Content
export interface Media {
  id: number;
  imageHref: string;
  imageTitle: string;
}

export interface Comment {
  id: number;
  commenter: User;
  content?: Content;
}

export interface Vote {
  id: number;
  voter: User;
  emotion?: number;
}

export const profileFactory = Factory.Sync.makeFactory<Profile>({
  firstName: Factory.each(() => faker.name.firstName()),
  lastName: Factory.each(() => faker.name.lastName()),
  avatar: Factory.each(() => faker.image.avatar())
});

const autoUserNameFactory = profileFactory.withDerivation2(
  ['firstName', 'lastName'],
  'userName',
  (fName, lName) =>
    `${fName.substring(0, 1).toLowerCase()}_${lName
      .substring(0, 3)
      .toLowerCase()}`
);

export const autoAvatarFactory = profileFactory.withDerivation2(
  ['firstName', 'lastName'],
  'avatar',
  (fName, lName) =>
    `${fName.substring(0, 1).toUpperCase()}${lName
      .substring(0, 1)
      .toUpperCase()}`
);

const completeProfile = profileFactory.combine(autoUserNameFactory);
// .combine(autoAvatarFactory);

export const userFactory: Factory.Sync.Factory<User> = Factory.makeFactory({
  id: Factory.each(i => i),
  profile: Factory.each(() => completeProfile.build())
});

export const owner0 = userFactory.build();
export const owner1 = userFactory.build();

export const user0 = userFactory.build();
export const user1 = userFactory.build();
export const user2 = userFactory.build();
export const user3 = userFactory.build();

const timeStamps = Factory.Sync.makeFactory({
  createdAt: Factory.Sync.each(() =>
    formatDistance(new Date(2018, 7, 1), new Date(), { locale: enGB })
  ),
  updatedAt: Factory.Sync.each(() =>
    formatDistance(new Date(2019, 7, 1), new Date(), { locale: enGB })
  )
});

export const currentTimeStamps = Factory.Sync.makeFactory({
  createdAt: Factory.Sync.each(() =>
    formatDistance(new Date(), new Date(), { locale: enGB })
  ),
  updatedAt: Factory.Sync.each(() =>
    formatDistance(new Date(), new Date(), { locale: enGB })
  )
});

const mediaFactory = Factory.Sync.makeFactory({
  id: Factory.each(i => i),
  imageHref: Factory.each(() => faker.image.imageUrl(300, 300, '', true)),
  imageTitle: Factory.each(() => faker.lorem.sentences(3))
});

export const contentFactory: Factory.Sync.Factory<Content> = Factory.makeFactory(
  {
    id: Factory.each(i => i),
    content: Factory.each(() => faker.lorem.paragraph(5)),
    title: Factory.each(() => faker.lorem.slug(5)),
    text: Factory.each(() => faker.lorem.sentences(3)),
    media: Factory.each(() => mediaFactory.build())
  }
).combine(timeStamps);

export const commentFactory: Factory.Sync.Factory<Comment> = Factory.makeFactory(
  {
    id: Factory.each(i => i),
    commenter: Factory.each(() => userFactory.build()),
    content: Factory.each(() =>
      contentFactory.build({
        media: {}
      })
    )
  }
);

const comments0 = commentFactory.buildList(3);
const comments1 = commentFactory.buildList(4);

const comments2 = commentFactory.buildList(3);
const comments3 = commentFactory.buildList(4);

const content0 = contentFactory.build();
const content1 = contentFactory.build();

const content2 = contentFactory.build();
const content3 = contentFactory.build();

export const post0: Post = {
  id: 123,
  author: user0,
  content: content0,
  comments: comments0,
  votes: []
};

export const post1: Post = {
  id: 124,
  author: user1,
  content: content1,
  comments: comments1,
  votes: []
};

export const post2: Post = {
  id: 125,
  author: user2,
  content: content2,
  comments: comments2,
  votes: []
};

export const post3: Post = {
  id: 126,
  author: user3,
  content: content3,
  comments: comments3,
  votes: []
};

export const timelineData: Array<Timeline> = [
  {
    id: 1000,
    owner: owner0,
    posts: [post0, post1]
  },
  {
    id: 1001,
    owner: owner1,
    posts: [post2, post3]
  }
];

export const usecaseData: UseCase = {
  id: 7777,
  timelines: timelineData
};

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

export const normalizeWrapper = <E>(data, dataSchema) => {
  return normalizeFn<any, E, any>(data, dataSchema);
};

export const denormalizeWrapper = (result, dataSchema, entities) => {
  return denormalizeFn(result, dataSchema, entities);
};
