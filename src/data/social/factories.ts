import * as Factory from 'factory.ts';
import faker from 'faker';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { User, Profile, Content, Comment } from '../../typings/social';

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

export const mediaFactory = Factory.Sync.makeFactory({
  id: Factory.each(i => i),
  imageHref: Factory.each(() => faker.image.imageUrl(300, 300, '', true)),
  imageTitle: Factory.each(() => faker.lorem.sentences(3))
});

const timeStampFactory = Factory.Sync.makeFactory({
  createdAt: Factory.Sync.each(() =>
    formatDistance(new Date(2018, 7, 1), new Date(), { locale: enGB })
  ),
  updatedAt: Factory.Sync.each(() =>
    formatDistance(new Date(2019, 7, 1), new Date(), { locale: enGB })
  )
});

export const currentTimeStampFactory = Factory.Sync.makeFactory({
  createdAt: Factory.Sync.each(() =>
    formatDistance(new Date(), new Date(), { locale: enGB })
  ),
  updatedAt: Factory.Sync.each(() =>
    formatDistance(new Date(), new Date(), { locale: enGB })
  )
});

export const contentFactory: Factory.Sync.Factory<Content> = Factory.makeFactory(
  {
    id: Factory.each(i => i),
    content: Factory.each(() => faker.lorem.paragraph(5)),
    title: Factory.each(() => faker.lorem.slug(5)),
    text: Factory.each(() => faker.lorem.sentences(3)),
    media: Factory.each(() => mediaFactory.build())
  }
).combine(timeStampFactory);

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
