import { Box } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React from 'react';

const checkForComponentUse = (tagName: string, content: string) => {
  const exp = new RegExp(`<${tagName}`);
  return exp.test(content);
};

// Contains the list of components that can be embed in MDX files
export const components = {
  Tag: dynamic(() => import('@app/components').then(module => module.Tag)),
  PDF: dynamic(() =>
    import('@app/components').then(module => module.Pdf.StepperContent)
  ),
  Demonstrator: dynamic(() =>
    import('@demonstrators-social/layout').then(module => module.Demonstrator)
  ),
  InterdisciplinaryApproach: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Perspective.Strategy.InterdisciplinaryApproach
    )
  ),
  SpectrumOfFalseInformation: dynamic(() =>
    import('@page/illustrations').then(
      module =>
        module.Components.Guides.Disinformation.SpectrumOfFalseInformation
    )
  ),
  Publications: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Guides.Research.Paper.Publications
    )
  ),
  AttackVectorsComparison: dynamic(() =>
    import('@page/illustrations').then(
      module =>
        module.Components.Security.AttackVectors.Comparison
          .AttackVectorsComparison
    )
  ),
  ByExample: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Pidp.Approach.ByExample.ByExample
    )
  ),
  Board: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.DiscoverMore.Team.Board
    )
  ),
  Concept1: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Ai.General.Concept1
    )
  ),
  Concept2: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Ai.General.Concept2
    )
  ),
  Concept3: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Ai.General.Concept3
    )
  ),
  ReversePrincipal: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Ai.Reverse.ReversePrincipal
    )
  ),
  MethodHooking: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Ai.Reverse.Hooks.MethodHooking
    )
  ),
  DataflowComparison: dynamic(() =>
    import('@page/illustrations').then(
      module => module.Components.Pet.Dataflow.Comparison.DataflowComparison
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

const getAndWrapComponents = (hydrationComponentsList = []) => {
  const componentsList = {};
  hydrationComponentsList.forEach(componentName => {
    const Component = components[componentName];
    componentsList[componentName] = props => (
      <Box>
        <Component {...props} />
      </Box>
    );
  });
  return componentsList;
};

export { getComponents, getAndWrapComponents, getHydrationComponentsList };
