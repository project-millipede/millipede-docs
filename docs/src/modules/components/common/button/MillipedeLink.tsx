import Link from 'next/link';
import React, { Component, SyntheticEvent } from 'react';

import NextLinkButton from './NextLinkButton';
import NextLinkMuiLink from './NextLinkMuiLink';

interface TProps {
  href: string;
  naked?: boolean;

  // Material Link Props
  onClick?: (event: SyntheticEvent) => void;
  target?: string;
  rel?: string;
  className?: string;
  other?: any;
  // router?: PublicRouterInstance;
}

type Props = TProps;

export class MillipedeLink extends Component<Props, {}> {
  render() {
    // const { naked, href, onClick, target, rel, className, ...other } = this.props;
    const { naked, href, onClick, target, rel, className } = this.props;

    if (naked) {
      return (
        <NextLinkButton component={Link} href={href} className={className} />
      );
    }

    return (
      <NextLinkMuiLink
        component={Link}
        href={href}
        onClick={onClick}
        target={target}
        className={className}
        rel={rel}
      />
    );
  }
}
