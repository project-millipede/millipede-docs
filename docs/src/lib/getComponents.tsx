import dynamic from 'next/dynamic';
import { createElement } from 'react';

const checkForComponentUse = (tagName: string, content: string) => {
  const exp = new RegExp(`<${tagName}`);
  return exp.test(content);
};

// Contains the list of components that can be embed in MDX files
const components = {
  Demonstrator: dynamic(() =>
    import('@demonstrators-social/layout').then(module => module.Demonstrator)
  ),
  Tag: dynamic(() => import('@app/components').then(module => module.Tag)),
  DiagramInterdisciplinaryApproach: dynamic(() =>
    import('@app/illustrations').then(
      module => module.Components.DiagramInterdisciplinaryApproach
    )
  ),
  SpectrumOfFalseInformation: dynamic(() =>
    import('../components/guides/disinformation/general').then(
      module => module.SpectrumOfFalseInformation
    )
  ),
  Publications: dynamic(() =>
    import('../components/guides/research/paper').then(
      module => module.Publications
    )
  ),
  AttackVectorsComparison: dynamic(() =>
    import('../components/rethink-security/attack-vectors/comparison').then(
      module => module.AttackVectorsComparison
    )
  ),
  ByExample: dynamic(() =>
    import('../components/pidp/approach/by-example').then(
      module => module.ByExample
    )
  ),
  TeamBoard: dynamic(() =>
    import('../components/discover-more/team').then(module => module.TeamBoard)
  ),
  Concept1: dynamic(() =>
    import('../components/ai/general').then(module => module.Concept1)
  ),
  Concept2: dynamic(() =>
    import('../components/ai/general').then(module => module.Concept2)
  ),
  Concept3: dynamic(() =>
    import('../components/ai/general').then(module => module.Concept3)
  ),
  ReverseEngineering: dynamic(() =>
    import('../components/ai/reverse/intro').then(
      module => module.ReverseEngineering
    )
  ),
  MethodHooking: dynamic(() =>
    import('../components/ai/reverse/hooks').then(
      module => module.MethodHooking
    )
  ),
  DataflowComparison: dynamic(() =>
    import('../components/pet/dataflow/comparison').then(
      module => module.DataflowComparison
    )
  )
};

// Returns an array with the components names found in a specific post
const getHydrationComponentsList = content => {
  return Object.keys(components).filter(compKey => {
    return checkForComponentUse(compKey, content);
  });
};

// Returns an object with the components required to render a post
const getComponents = (hydrationComponentsList = []) => {
  const componentsList = {};
  hydrationComponentsList.forEach(componentName => {
    componentsList[componentName] = components[componentName];
  });
  return componentsList;
};

const asyncComponents = {
  Async: () =>
    Promise.resolve(({ children }) => createElement('div', {}, children))
};

const getHydrationAsyncComponentsList = content => {
  return Object.keys(asyncComponents).filter(compKey => {
    return checkForComponentUse(compKey, content);
  });
};

// Returns an object with the components required to render a blog post
const getAsyncComponents = (hydrationComponentsList = []) => {
  const componentsList = {};
  hydrationComponentsList.forEach(componentName => {
    componentsList[componentName] = components[componentName];
  });
  return componentsList;
};

export {
  getComponents,
  getAsyncComponents,
  getHydrationComponentsList,
  getHydrationAsyncComponentsList
};
