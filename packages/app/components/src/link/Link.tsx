import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, forwardRef, ForwardRefRenderFunction } from 'react';

export interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    NextLinkProps {}

const NextLinkComposed: ForwardRefRenderFunction<
  HTMLAnchorElement,
  NextLinkComposedProps
> = (
  { href, replace, scroll, shallow, passHref, prefetch, locale, ...other },
  ref
) => {
  return (
    <NextLink
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
};

const NextLinkComposedWithRef = forwardRef(NextLinkComposed);

export type LinkProps = NextLinkComposedProps & Omit<MuiLinkProps, 'href'>;

const InternalLink: ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
  { href, ...other },
  ref
) => {
  if (typeof href === 'string') {
    return <MuiLink ref={ref} href={href} {...other} />;
  }
  return (
    <MuiLink
      component={NextLinkComposedWithRef}
      ref={ref}
      href={href as any}
      {...other}
    />
  );
};

export const Link = forwardRef(InternalLink);

export const HiddenUnderlineLink = styled(Link)(() => ({
  textDecoration: 'none'
}));
