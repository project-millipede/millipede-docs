import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { AnchorHTMLAttributes, forwardRef, ForwardRefRenderFunction } from 'react';

export interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    NextLinkProps {}

export const NextLinkComposed: ForwardRefRenderFunction<
  HTMLAnchorElement,
  NextLinkComposedProps
> = (
  { href, replace, scroll, passHref, shallow, prefetch, locale, ...other },
  ref
) => {
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
};

export const NextLinkComposedWithRef = forwardRef(NextLinkComposed);

export type LinkProps = {
  activeClassName?: string;
  noLinkStyle?: boolean;
} & NextLinkComposedProps &
  Omit<MuiLinkProps, 'href'>;

const Link: ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
  {
    activeClassName = 'active',
    className: classNameProps,
    href,
    noLinkStyle,
    ...other
  },
  ref
) => {
  const router = useRouter();

  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  });

  if (typeof href === 'string') {
    if (noLinkStyle) {
      return (
        <a className={className} href={href} ref={ref as any} {...other} />
      );
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposedWithRef
        className={className}
        ref={ref as any}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposedWithRef}
      className={className}
      ref={ref}
      href={href as any}
      {...other}
    />
  );
};

export default forwardRef(Link);
