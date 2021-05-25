import { CollectionUtil } from '@app/utils';
import { atom, selector, selectorFamily } from 'recoil';

import { NavigationState, PartialViewElement } from '../../../types';
import { Position } from '../../../types/View';
import { appCompositionState } from '../app/reducers';

export const partialViewElements: Array<PartialViewElement> = [
  {
    id: 'LeftViewElement',
    label: 'Author',
    siblings: []
  },
  {
    id: 'ViewElement',
    label: 'Actions',
    siblings: [
      // {
      //   id: 'DockViewElementLeft',
      //   position: Position.left
      // },
      // { id: 'DockViewElementRight', position: Position.right }
    ]
  },
  {
    id: 'RightViewElement',
    label: 'Consumer',
    siblings: []
  }
];

const initialState: NavigationState = {
  views: [],
  viewElements: []
};

export const viewNavigationState = atom({
  key: 'view-navigation',
  default: initialState
});

// export const activeViewIdSelector = selector<PartialViewElement>({
//   key: 'active-view-id-selector',
//   get: ({ get }) => {
//     const { views, viewElements } = get(viewNavigationState);
//     const activeView = views.find(view => view.position === Position.middle);
//     const activeViewElement = viewElements.find(
//       viewElement => viewElement.parentId === activeView.id
//     );
//     return (activeViewElement && activeViewElement) || { id: '', label: '' };
//   }
// });

export const activeViewIdSelector = selector<Array<PartialViewElement>>({
  key: 'active-view-id-selector',
  get: ({ get }) => {
    const { views, viewElements } = get(viewNavigationState);

    const { isMobile } = get(appCompositionState);

    if (views.length === 0) return [{ id: '', label: '' }];

    if (isMobile) {
      const activeView = views.find(view => view.position === Position.middle);
      const activeViewElement = viewElements.find(
        viewElement => viewElement.parentId === activeView.id
      );
      return [
        (activeViewElement && activeViewElement) || { id: '', label: '' }
      ];
    } else {
      const allViewIds = views.map(view => view.id);
      return (
        viewElements.filter(viewElement => {
          return allViewIds.includes(viewElement.parentId);
        }) || [{ id: '', label: '' }]
      );
    }
  }
});

export const activeViewIndexSelector = selectorFamily<number, string>({
  key: 'active-view-index-selector',
  // id corresponds to layoutId
  get:
    id =>
    ({ get }) => {
      const { views, viewElements } = get(viewNavigationState);
      const viewElement = viewElements.find(
        viewElement => viewElement.id === id
      );

      if (viewElement == null) {
        return -1;
      }

      return views.findIndex(
        view =>
          view.position === Position.middle && view.id === viewElement.parentId
      );
    }
});

export const previousViewIdSelector = selector<PartialViewElement>({
  key: 'previous-view-id-selector',
  get: ({ get }) => {
    const { views, viewElements } = get(viewNavigationState);

    const allLeftViewIds = views
      .filter(view => view.position === Position.left)
      .map(view => view.id);

    const previousViewElement = CollectionUtil.Array.reverse(viewElements).find(
      viewElement => {
        const include = allLeftViewIds.includes(viewElement.parentId);
        return include;
      }
    );

    return (previousViewElement && previousViewElement) || { id: '' };
  }
});

export const nextViewIdSelector = selector<PartialViewElement>({
  key: 'next-view-id-selector',
  get: ({ get }) => {
    const { views, viewElements } = get(viewNavigationState);

    const allRightViewIds = views
      .filter(view => view.position === Position.right)
      .map(view => view.id);

    const nextViewElement = viewElements.find(viewElement => {
      const include = allRightViewIds.includes(viewElement.parentId);
      return include;
    });

    return (nextViewElement && nextViewElement) || { id: '' };
  }
});

export const hasPreviousOrNextViewSelector = selector<[boolean, boolean]>({
  key: 'has-previous-or-next-view-selector',
  get: ({ get }) => {
    const { views, viewElements } = get(viewNavigationState);

    const allViewElementParentIds = viewElements.map(
      viewElement => viewElement.parentId
    );

    const allLeftViewIds = views
      .filter(view => view.position === Position.left)
      .map(view => view.id);

    const allRightViewIds = views
      .filter(view => view.position === Position.right)
      .map(view => view.id);

    const hasPrevious = CollectionUtil.Array.findCommonIds(
      allViewElementParentIds,
      allLeftViewIds
    );
    const hasNext = CollectionUtil.Array.findCommonIds(
      allViewElementParentIds,
      allRightViewIds
    );

    return [hasPrevious, hasNext];
  }
});

// Separate views

// Simple move steps | left to right

// A = left, B = middle, C = right

// A [ F ] | B [ G    ] | C [   ]

// A [   ] > B [ F, G ] | C [   ]

// A [   ] | B [ F    ] > C [ G ]

// Source views => Target views
// A [ F ] | B [ G ] => B [ F ] | C [ G ]

// Simple move steps | left to right

// A [ F ] | B [   ] | C [ G    ] | D [   ]

// A [   ] > B [ F ] | C [ G    ] | D [   ]

// A [   ] | B [   ] > C [ F, G ] | D [   ]

// A [   ] | B [   ] | C [ F    ] > D [ G ]

// Source views => Target views
// A [ F ] | C [ G ] => C [ F ] | D [ G ]

// Normalise

// A [ F ] | B [ G ]

// A [   ] > B [ F, G ]

// A [   ] | B [ F    ] > C [ G ]

// Source views => Target views

// A [ F ] | B [ G ] => B [ F ] > C [ G ]

// Normalise middle right to left

// B [ F ] | C [ G ]

// B [ F, G ] < C [ ]

// A [ F ] < B [ G ]  | C [ ]

// Source views => Target views

// B [ F ] | C [ G ] => A [ F ] > B [ G ]
