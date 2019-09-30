// TODO:

// Figure out if quote and title is the same - consolidate quote, title
// Figure out if facebook accepts hashtag Array<string> - consolidate hashtag, hashtags

export type SocialMediaURIPathParams =
  | URIPathParamsFacebook
  | URIPathParamsLinkedIn
  | URIPathParamsTwitter
  | URIPathParamsWhatsApp;

export interface SocialData {
  baseUrl: string;
  hashTags: Array<string>;
  share: string;
}

export interface URIPathParamsFacebook {
  u: string;
  quote: string;
  hashtag: string;
}

export interface URIPathParamsLinkedIn {
  url: string;
  source: string;
  summary: string;
  mini: boolean;
}

export interface URIPathParamsTwitter {
  url: string;
  via: string;
  text: string;
  hashtags: Array<string>;
  mini: boolean;
}

export interface URIPathParamsWhatsApp {
  text: string;
}

export enum Interaction {
  SHARE,
  SHARE_LOCAL,
  CONTRIBUTE
}

export interface InteractionMenuItem {
  id: string;
  type: Interaction;
  title: string;
  url: string;
  params: SocialMediaURIPathParams;
}
