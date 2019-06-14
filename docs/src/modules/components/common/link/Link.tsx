import MuiLink from '@material-ui/core/Link';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import React, { Component } from 'react';

import withInteraction from './LinkHoc';
import NextLink from './NextLink';

type TProps = {
  as?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  target?: string;
  prefetch?: boolean;
  rel?: string;
  naked?: boolean;
  other?: any;
  className?: string;
  display?: "initial" | "inline" | "block";
  color?:
    | "inherit"
    | "initial"
    | "error"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary";
  underline?: "none" | "hover" | "always";
};

export type TLinkProps = TProps & {
  activeClassName?: string;
  href?: string;
};

export type TRouterLinkProps = WithRouterProps & TLinkProps;

export class Link extends Component<TRouterLinkProps, {}> {
  render() {
    const { onClick, target, rel, naked, className, ...other } = this.props;

    if (naked) {
      return <NextLink className={className} target={target} rel={rel} {...other} />;
    }

    return (
      <MuiLink
        component={NextLink}
        onClick={onClick}
        underline="none"
        className={className}
        target={target}
        rel={rel}
        {...other}
      />
    );
  }
}

export default withRouter<TRouterLinkProps>(withInteraction(Link));
