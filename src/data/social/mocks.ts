import { v4 as uuidv4 } from 'uuid';

import { MathUtil } from '../../../docs/src/modules/utils';
import { Comment, Content, Post, UseCase, User } from '../../typings/social';
import { commentFactory, contentFactory, userFactory } from './factories';

let users: Array<User> = [];
let owners: Array<User> = [];
let comments: Array<Array<Comment>> = [];
let contents: Array<Content> = [];
let posts: Array<Post> = [];

export const getEntity = <T>(entityCollection: Array<T>, index: number) => {
  if (
    entityCollection &&
    entityCollection.length >= index &&
    entityCollection[index] !== undefined
  ) {
    return entityCollection[index];
  }
  return null;
};

export const generateComments = async (
  countCommentSections: number,
  countPerCommentSection: number
) => {
  return Promise.all(
    [...new Array(countCommentSections)].map(() => {
      return commentFactory.buildList(
        MathUtil.generateRandomInteger(0, countPerCommentSection)
      );
    })
  );
};

export const generatePosts = (entityCollection: Array<Post>, size: number) => {
  if (entityCollection.length === 0) {
    return [...new Array(size)].map((_item, index) => {
      return {
        id: uuidv4(),
        author: getEntity<User>(users, index),
        content: getEntity<Content>(contents, index),
        comments: getEntity<Array<Comment>>(comments, index),
        votes: []
      };
    });
  }
  return entityCollection;
};

export const generateData = async () => {
  users = await userFactory.buildList(4);
  owners = await userFactory.buildList(2);
  comments = await generateComments(4, 4);
  contents = await contentFactory.buildList(4);
  posts = generatePosts(posts, 4);

  const usecaseData: UseCase = {
    id: uuidv4(),
    timelines: [
      {
        id: uuidv4(),
        owner: getEntity<User>(owners, 0),
        posts: [posts[0], posts[1]]
      },
      {
        id: uuidv4(),
        owner: getEntity<User>(owners, 1),
        posts: [posts[2], posts[3]]
      }
    ]
  };
  return usecaseData;
};
