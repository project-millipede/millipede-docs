import { Async } from 'factory.ts';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

import { generateRandomInteger } from '../../../docs/src/modules/utils/math';
import {
  Comment,
  Content,
  Media,
  Post,
  Profile,
  Timeline,
  User
} from '../../typings/social';
import { generateImageURL } from './images/picsum';

const profileFactory = Async.makeFactory<Profile>({
  firstName: Async.each(() => faker.name.firstName()),
  lastName: Async.each(() => faker.name.lastName()),
  avatar: Async.each(() => faker.image.avatar())
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
  imageHref: Async.each(() => generateImageURL(300, 200)),
  imageTitle: Async.each(() => faker.lorem.sentences(3))
});

const timeStampFactory = Async.makeFactory({
  createdAt: Async.each(() => new Date(2018, 7, 1))
});

export const currentTimeStampFactory = Async.makeFactory({
  createdAt: Async.each(() => new Date())
});

export const contentFactory: Async.Factory<Content> = Async.makeFactory({
  id: Async.each(() => uuidv4()),
  title: Async.each(() => faker.lorem.slug(5)),
  text: Async.each(() => faker.lorem.sentences(3)),
  media: Async.each(() => mediaFactory.build())
}).combine(timeStampFactory);

export const contentFactoryRealtime: Async.Factory<Content> = Async.makeFactory(
  {
    id: Async.each(() => uuidv4()),
    title: Async.each(() => faker.lorem.slug(5)),
    text: Async.each(() => faker.lorem.sentences(3)),
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
    commentFactory.buildList(generateRandomInteger(5))
  ),
  votes: []
});

export const postFactoryRealtime = Async.makeFactory<Post>({
  id: Async.each(() => uuidv4()),
  content: Async.each(() => contentFactoryRealtime.build()),
  comments: Async.each(() =>
    commentFactory.buildList(generateRandomInteger(5))
  ),
  votes: []
});

export const timelineFactory = Async.makeFactory<Timeline>({
  id: Async.each(() => uuidv4())
});
