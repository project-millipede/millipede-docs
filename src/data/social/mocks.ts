import { v4 as uuidv4 } from 'uuid';

import { Post, Timeline, UseCase } from '../../typings/social';
import { commentFactory, contentFactory, userFactory } from './factories';

export const owner0 = userFactory.build();
export const owner1 = userFactory.build();

export const user0 = userFactory.build();
export const user1 = userFactory.build();
export const user2 = userFactory.build();
export const user3 = userFactory.build();

const comments0 = commentFactory.buildList(3);
const comments1 = commentFactory.buildList(4);

const comments2 = commentFactory.buildList(3);
const comments3 = commentFactory.buildList(4);

const content0 = contentFactory.build();
const content1 = contentFactory.build();

const content2 = contentFactory.build();
const content3 = contentFactory.build();

export const post0: Post = {
  id: uuidv4(),
  author: user0,
  content: content0,
  comments: comments0,
  votes: []
};

export const post1: Post = {
  id: uuidv4(),
  author: user1,
  content: content1,
  comments: comments1,
  votes: []
};

export const post2: Post = {
  id: uuidv4(),
  author: user2,
  content: content2,
  comments: comments2,
  votes: []
};

export const post3: Post = {
  id: uuidv4(),
  author: user3,
  content: content3,
  comments: comments3,
  votes: []
};

export const timelineData: Array<Timeline> = [
  {
    id: uuidv4(),
    owner: owner0,
    posts: [post0, post1]
  },
  {
    id: uuidv4(),
    owner: owner1,
    posts: [post2, post3]
  }
];

export const usecaseData: UseCase = {
  id: uuidv4(),
  timelines: timelineData
};
