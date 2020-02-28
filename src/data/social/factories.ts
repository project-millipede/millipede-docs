import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Async } from 'factory.ts';
import faker from 'faker';

import { Comment, Content, Media, Profile, User } from '../../typings/social';
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

export const userFactory: Async.Factory<User> = Async.makeFactory({
  id: Async.each(i => i),
  profile: Async.each(() => completeProfile.build())
});

export const mediaFactory: Async.Factory<Media> = Async.makeFactory({
  id: Async.each(i => i),
  imageHref: Async.each(() => generateImageURL()),
  imageTitle: Async.each(() => faker.lorem.sentences(3))
});

const timeStampFactory = Async.makeFactory({
  createdAt: Async.each(() =>
    formatDistance(new Date(2018, 7, 1), new Date(), { locale: enGB })
  ),
  updatedAt: Async.each(() =>
    formatDistance(new Date(2019, 7, 1), new Date(), { locale: enGB })
  )
});

export const currentTimeStampFactory = Async.makeFactory({
  createdAt: Async.each(() =>
    formatDistance(new Date(), new Date(), { locale: enGB })
  ),
  updatedAt: Async.each(() =>
    formatDistance(new Date(), new Date(), { locale: enGB })
  )
});

export const contentFactory: Async.Factory<Content> = Async.makeFactory({
  id: Async.each(i => i),
  title: Async.each(() => faker.lorem.slug(5)),
  text: Async.each(() => faker.lorem.sentences(3)),
  media: Async.each(() => mediaFactory.build())
}).combine(timeStampFactory);

export const commentFactory: Async.Factory<Comment> = Async.makeFactory({
  id: Async.each(i => i),
  commenter: Async.each(() => userFactory.build()),
  content: Async.each(() =>
    contentFactory.build({
      media: {}
    })
  )
});
