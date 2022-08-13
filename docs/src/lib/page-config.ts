import dynamic from 'next/dynamic';

import { ComponentMap } from './types';

/**
 * Components used within the documentation pages
 */

export const docComponents: ComponentMap = {
  Statement: {
    component: dynamic(() =>
      import('@app/components').then(module => module.Statement.Statement)
    )
  },
  Tag: {
    component: dynamic(() =>
      import('@app/components').then(module => module.Tag)
    )
  },
  PDF: {
    component: dynamic(() =>
      import('@app/components').then(module => module.Pdf.StepperContent)
    )
  },
  Demonstrator: {
    component: dynamic(
      () =>
        import('@demonstrators-social/layout').then(
          module => module.Demonstrator
        ),
      { ssr: false }
    ),
    requireWrapper: true
  },
  InterdisciplinaryApproach: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module =>
          module.Components.Perspective.Strategy.InterdisciplinaryApproach
      )
    )
  },
  SpectrumOfFalseInformation: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module =>
          module.Components.Guides.Disinformation.SpectrumOfFalseInformation
      )
    )
  },
  Publications: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Guides.Research.Paper.Publications
      )
    )
  },
  AttackVectorsComparison: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module =>
          module.Components.Security.AttackVectors.Comparison
            .AttackVectorsComparison
      )
    )
  },
  ByExample: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Pidp.Approach.ByExample.ByExample
      )
    )
  },
  Board: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.DiscoverMore.Team.Board
      )
    )
  },
  Concept1: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Ai.General.Concept1
      )
    ),
    requireWrapper: true
  },
  Concept2: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Ai.General.Concept2
      )
    ),
    requireWrapper: true
  },
  Concept3: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Ai.General.Concept3
      )
    ),
    requireWrapper: true
  },
  ReversePrincipal: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Ai.Reverse.ReversePrincipal
      )
    )
  },
  MethodHooking: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Ai.Reverse.Hooks.MethodHooking
      )
    )
  },
  DataflowComparison: {
    component: dynamic(() =>
      import('@page/illustrations').then(
        module => module.Components.Pet.Dataflow.Comparison.DataflowComparison
      )
    )
  }
};

/**
 * Components used within the blog pages
 */

export const blogComponents: ComponentMap = {
  // currently empty, first component to onload is interactive feedback-loop
  Statement: {
    component: dynamic(() =>
      import('@app/components').then(module => module.Statement.Statement)
    )
  }
};
