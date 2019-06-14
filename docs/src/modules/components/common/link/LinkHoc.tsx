import cx from 'classnames';
import { WithRouterProps } from 'next/dist/client/with-router';
import React from 'react';

type WithInteractionProps = WithRouterProps & {
  className?: string;
  activeClassName?: string;
  href?: string;
};

const withInteraction = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  class WithInteraction extends React.Component<P & WithInteractionProps> {
    render() {
      const { className, activeClassName, router } = this.props;
      const selectedClassName = cx(className, {
        [activeClassName]: router.pathname === this.props.href && activeClassName
      });
      return <WrappedComponent className={selectedClassName} {...this.props as P} />;
    }
  };

export default withInteraction;
