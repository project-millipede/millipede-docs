import { CollectionUtil } from '@app/utils';
import { selector, selectorFamily } from 'recoil';

import { PartialViewElement, Position, TView } from '../../../types';
import { appCompositionState } from '../../app/states';
import { viewNavigationState } from './states';

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

export const parentIdSelector = selectorFamily<string, string>({
  key: 'parent-id-selector',
  get:
    viewId =>
    ({ get }) => {
      const { viewElements } = get(viewNavigationState);
      const { parentId } = viewElements.find(
        viewElement => viewElement.id === viewId
      );
      return parentId;
    }
});

export const viewsToRenderSelector = selector<Array<TView>>({
  key: 'views-to-render-selector',
  get: ({ get }) => {
    const { views, viewElements } = get(viewNavigationState);
    const viewElementParentIds = viewElements.map(
      viewElement => viewElement.parentId
    );
    return views.filter(view => {
      return viewElementParentIds.includes(view.id);
    });
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
