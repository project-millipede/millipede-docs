import { GuardUtil } from '@app/utils';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';

const { isString } = GuardUtil.Primitives;

export type NextLinkComposedProps = NextLinkProps;

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

export type LinkProps = NextLinkComposedProps;

const InternalLink: ForwardRefRenderFunction<
  HTMLAnchorElement,
  LinkProps & { children: ReactNode }
> = ({ href, ...other }, ref) => {
  if (isString(href)) {
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
