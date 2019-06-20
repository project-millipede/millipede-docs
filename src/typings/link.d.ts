declare type Url = string | UrlObject;
declare interface FormatResult {
  href: string;
  as?: string;
}

export declare interface LinkProps {
  href: Url;
  as?: Url | undefined;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  onError?: (error: Error) => void;
  /**
   * @deprecated since version 8.1.1-canary.20
   */
  prefetch?: boolean;
}
