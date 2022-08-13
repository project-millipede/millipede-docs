import { nanoid } from 'nanoid';

import { FlattenedPartialViewElement, PartialViewElement, Position, TPosition, TView } from '../types';

export const generateViews = (size: number, position: TPosition) => {
  return Array.from<any, TView>({ length: size }, () => ({
    id: nanoid(),
    position
  }));
};

export const createViews = (
  viewElements: Array<FlattenedPartialViewElement>
): [Array<TView>, TView, Array<TView>] => {
  const viewsToGenerate =
    viewElements.filter(viewElement => viewElement.isParent).length - 1;

  const initialMiddleView: TView = {
    id: nanoid(),
    position: Position.middle
  };

  const initialLeftViews = generateViews(viewsToGenerate, Position.left);
  const initialRightViews = generateViews(viewsToGenerate, Position.right);

  return [initialLeftViews, initialMiddleView, initialRightViews];
};

/**
 * Note: The argument arrays viewElements and views are of same length
 */

export const createViewElements = (
  viewElements: Array<FlattenedPartialViewElement>,
  views: Array<TView>
) => {
  return viewElements.map((viewElement, index) => {
    const view = views[index];
    return {
      ...viewElement,
      parentId: view.id,
      previousParentId: view.id,
      position: view.position,
      previousPosition: view.position
    };
  });
};

export const flattenViewElements = (
  viewElements: Array<PartialViewElement>,
  key: string
) => {
  return viewElements.reduce<Array<FlattenedPartialViewElement>>(
    (acc, viewElement) => {
      if (viewElement[key]) {
        // eslint-disable-next-line no-param-reassign
        acc = [
          ...acc,
          {
            ...viewElement,
            isParent: true
          }
        ];
      } else {
        // eslint-disable-next-line no-param-reassign
        acc = [
          ...acc,
          {
            ...viewElement,
            isParent: false
          }
        ];
      }

      if (Array.isArray(viewElement[key])) {
        // eslint-disable-next-line no-param-reassign
        acc = [...acc, ...flattenViewElements(viewElement[key], key)];
      }
      return acc;
    },
    []
  );
};
