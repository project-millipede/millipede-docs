export interface UseCase {
  id: string;
  timelines: Array<Timeline>;
}

// Top tier model
export interface Timeline {
  id: string;
  owner?: User;
  // Reflects posts from other users (friends) and those from the timeline owner
  posts?: Array<Post>;
}

export interface Post {
  id: string;
  author?: User;
  content: Content;
  comments: Array<Comment>;
  votes?: Array<Vote>;

  active?: boolean;
}

// Second tier model

// => Post

export interface User {
  id?: string;
  profile?: Profile;

  // UserIds of a users friends. Items are generated in a normalized manner
  friends?: Array<string>;
}

export interface Content {
  id: string;
  createdAt: Date;
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
  id: string;
  imageHref: string;
  imageTitle: string;
}

export interface Comment {
  id: string;
  commenter?: User;
  content: Content;
}

export interface Vote {
  id: string;
  voter: User;
  emotion?: number;
}
