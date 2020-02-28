// TODO:

// Figure out if quote and title is the same - consolidate quote, title
// Figure out if facebook accepts hashtag Array<string> - consolidate hashtag, hashtags

export type SocialMediaURIPathParams =
  | URIPathParamsMail
  | URIPathParamsFacebook
  | URIPathParamsLinkedIn
  | URIPathParamsTwitter
  | URIPathParamsWhatsApp;

export interface SocialData {
  baseUrl: string;
  hashTags: Array<string>;
  share: string;
}

export interface URIPathParamsMail {
  subject: string;
  body: string;
}

export interface URIPathParamsFacebook {
  u: string;
  quote: string;
  hashtag: string;
}

export interface URIPathParamsLinkedIn {
  url: string;
  title: string;
  summary: string;
  source: string;
  mini: boolean;
}

export interface URIPathParamsTwitter {
  url: string;
  via?: string;
  text: string;
  hashtags: Array<string>;
}

export interface URIPathParamsWhatsApp {
  text: string;
}

export enum Interaction {
  SHARE,
  SHARE_LOCAL,
  SHARE_MAIL,
  CONTRIBUTE
}

export interface InteractionMenuItem {
  id: string;
  type: Interaction;
  title: string;
  url: string;
  params: SocialMediaURIPathParams;
}

export interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  hashtags?: string;
  author?: string;
  date?: string;
}
