export interface SocialMediaURIPathParams {
  u: string;
  quote: string;
  hashtag: string;
}

export enum Interaction {
  SHARE,
  SHARE_LOCAL,
  CONTRIBUTE
}

export interface InteractionMenuItem {
  type: Interaction;
  title: string;
  url: string;
}
