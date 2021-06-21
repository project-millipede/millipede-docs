import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { AnchorHTMLAttributes, Ref } from 'react';
import React, { FC, forwardRef } from 'react';
import { UrlObject } from 'url';

export type NextComposedProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  NextLinkProps;

export type LinkProps = NextComposedProps &
  Omit<MuiLinkProps, 'ref'> & {
    activeClassName?: string;
    innerRef?: Ref<HTMLAnchorElement>;
    naked?: boolean;
  };

const NextComposed = forwardRef<HTMLAnchorElement, NextComposedProps>(
  (
    {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      children,
      ...other
    },
    ref
  ) => {
    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...other}>
          {children}
        </a>
      </NextLink>
    );
  }
);

const Link: FC<LinkProps> = ({
  activeClassName = 'active',
  className: classNameProps,
  href,
  innerRef,
  naked,
  ...other
}) => {
  const router = useRouter();
  const pathname =
    typeof href === 'string' ? href : (href as UrlObject).pathname;

  const className = clsx(classNameProps, {
    [activeClassName]: router && router.pathname === pathname && activeClassName
  });

  if (naked) {
    return (
      <NextComposed
        ref={innerRef}
        href={href}
        className={className}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      ref={innerRef}
      href={href}
      className={className}
      {...other}
    />
  );
};

export default forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));
