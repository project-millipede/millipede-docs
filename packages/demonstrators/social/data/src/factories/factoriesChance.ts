import { MathUtil } from '@app/utils';
import Chance from 'chance';
import { Async } from 'factory.ts';
import { v4 as uuidv4 } from 'uuid';

import { Comment, Content, Media, Post, Profile, Timeline, User } from '../types';
import { generateImageURL } from './helper/images/picsum';

const chance = new Chance();

const profileFactory = Async.makeFactory<Profile>({
  firstName: Async.each(() => chance.first()),
  lastName: Async.each(() => chance.last()),
  avatar: Async.each(() => generateImageURL(40, 40))
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

export const userFactory = Async.makeFactory<User>({
  id: Async.each(() => uuidv4()),
  profile: Async.each(() => completeProfile.build()),
  friends: Async.each(() => [])
});

const mediaFactory = Async.makeFactory<Media>({
  id: Async.each(() => uuidv4()),
  imageHref: Async.each(() => generateImageURL(800, 600)),
  imageTitle: Async.each(() => chance.paragraph({ sentences: 3 }))
});

const timeStampFactory = Async.makeFactory({
  createdAt: Async.each(() => new Date(2018, 7, 1))
});

export const currentTimeStampFactory = Async.makeFactory({
  createdAt: Async.each(() => new Date())
});

export const contentFactory: Async.Factory<Content> = Async.makeFactory({
  id: Async.each(() => uuidv4()),
  title: Async.each(() => chance.sentence({ words: 5 })),
  text: Async.each(() => chance.paragraph({ sentences: 3 })),
  media: Async.each(() => mediaFactory.build())
}).combine(timeStampFactory);

export const contentFactoryRealtime: Async.Factory<Content> = Async.makeFactory(
  {
    id: Async.each(() => uuidv4()),
    title: Async.each(() => chance.sentence({ words: 5 })),
    text: Async.each(() => chance.paragraph({ sentences: 3 })),
    media: Async.each(() => mediaFactory.build())
  }
).combine(currentTimeStampFactory);

export const contentCommentFactory = contentFactory.extend({
  media: {}
});

export const commentFactory = Async.makeFactory<Comment>({
  id: Async.each(() => uuidv4()),
  commenter: Async.each(() => userFactory.build()),
  content: Async.each(() => contentCommentFactory.build())
});

export const postFactory = Async.makeFactory<Post>({
  id: Async.each(() => uuidv4()),
  content: Async.each(() => contentFactory.build()),
  comments: Async.each(() =>
    commentFactory.buildList(MathUtil.generateRandomInteger(5))
  ),
  votes: []
});

export const postFactoryRealtime = Async.makeFactory<Post>({
  id: Async.each(() => uuidv4()),
  content: Async.each(() => contentFactoryRealtime.build()),
  comments: Async.each(() =>
    commentFactory.buildList(MathUtil.generateRandomInteger(5))
  ),
  votes: []
});

export const timelineFactory = Async.makeFactory<Timeline>({
  id: Async.each(() => uuidv4())
});
