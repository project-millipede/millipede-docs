import { createFriendships } from '.';
import { User } from '../../../typings/social';

const users: Array<User> = [
  {
    id: '1',
    friends: []
  },
  {
    id: '2',
    friends: []
  },
  {
    id: '3',
    friends: []
  },
  {
    id: '4',
    friends: []
  },
  {
    id: '5',
    friends: []
  }
];

test('should create friendships for a single root friend', () => {
  const result = createFriendships(users, ['1']);
  expect(result).toEqual([
    {
      id: '1',
      friends: ['2', '3', '4', '5']
    },
    {
      id: '2',
      friends: ['1']
    },
    {
      id: '3',
      friends: ['1']
    },
    {
      id: '4',
      friends: ['1']
    },
    {
      id: '5',
      friends: ['1']
    }
  ]);
});

test('should create friendships for multiple root friends', () => {
  const result = createFriendships(users, ['1', '3']);
  expect(result).toEqual([
    {
      id: '1',
      friends: ['2', '4', '5']
    },
    {
      id: '2',
      friends: ['1', '3']
    },
    {
      id: '3',
      friends: ['2', '4', '5']
    },
    {
      id: '4',
      friends: ['1', '3']
    },
    {
      id: '5',
      friends: ['1', '3']
    }
  ]);
});
