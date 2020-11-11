import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { AnchorHTMLAttributes, FC, forwardRef, Ref } from 'react';

type NextComposedProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  NextLinkProps;

const NextComposed = forwardRef<HTMLAnchorElement, NextComposedProps>(
  (
    { as, href, replace, scroll, passHref, shallow, prefetch, ...other },
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
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
);

interface LinkPropsBase {
  activeClassName?: string;
  innerRef?: Ref<HTMLAnchorElement>;
  naked?: boolean;
}

type LinkProps = LinkPropsBase & NextComposedProps & Omit<MuiLinkProps, 'ref'>;

const Link: FC<LinkProps> = ({
  activeClassName = 'active',
  className: classNameProps,
  href,
  innerRef,
  naked,
  ...other
}) => {
  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
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
