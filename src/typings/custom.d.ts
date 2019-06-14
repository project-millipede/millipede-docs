import React, { Component } from 'react';
import { UrlObject } from 'url';

declare module "*.md" {
  const content: any;
  export default content;
}

declare module "*.mdx" {
  const code: any;
  const meta: any;
  const ast: any;
  const headingsMap: any;
  const raw: any;
  export { code, meta, ast, headingsMap, raw };
}

declare type Url = string | UrlObject;
declare type FormatResult = {
  href: string;
  as?: string;
};
declare type LinkProps = {
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
};
