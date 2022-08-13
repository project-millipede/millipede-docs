import { RecoilRoot } from 'recoil';

import { ComponentMap } from '../types';

const checkComponentUtilization = (content: string, component: string) => {
  const exp = new RegExp(`<${component}`);
  return exp.test(content);
};

export const getHydratedComponents = (
  content: string,
  components: ComponentMap
) => {
  return Object.keys(components).filter(component => {
    return checkComponentUtilization(content, component);
  });
};

export const getComponents = (
  components: ComponentMap,
  componentIds: Array<string> = []
) => {
  return Object.entries(components)
    .filter(([key, _value]) => componentIds.includes(key))
    .reduce((acc, [key, loadableComponent]) => {
      const Component = loadableComponent.component;
      return {
        ...acc,
        [key]: Component
      };
    }, {});
};

export const getLoadableComponents = (
  components: ComponentMap,
  componentIds: Array<string> = []
) => {
  return Object.entries(components)
    .filter(([key, _value]) => componentIds.includes(key))
    .reduce((acc, [key, loadableComponent]) => {
      const Component = loadableComponent.component;
      const { requireWrapper = false } = loadableComponent;
      return {
        ...acc,
        [key]: requireWrapper
          ? props => (
              <RecoilRoot key={`store-${key}`}>
                <Component {...props} />
              </RecoilRoot>
            )
          : Component
      };
    }, {});
};
