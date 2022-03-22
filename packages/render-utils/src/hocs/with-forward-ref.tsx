import {
  ComponentType,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

export const withForwardRef = <T, P extends Record<string, any>>(
  Comp: ComponentType<P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
  const WrappedComp: ForwardRefRenderFunction<T, P> = (props, ref) => {
    return <Comp {...props} forwardedRef={ref} />;
  };

  const name = Comp.displayName || Comp.name;
  WrappedComp.displayName = `withForwardedRef(${name})`;

  return forwardRef(WrappedComp);
};
