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
  title?: string;
  text?: string;
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
  content: Content;
}

export interface Vote {
  id: number;
  voter: User;
  emotion?: number;
}
