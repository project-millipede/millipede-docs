import isArray from 'lodash/isArray';
import { nanoid } from 'nanoid';

import { FlattenedPartialViewElement, PartialViewElement, TPosition, TView } from '../types';
import { Position } from '../types/View';

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

export const createViewElements = (
  viewElements: Array<FlattenedPartialViewElement>,
  views: Array<TView>
) => {
  let restViews: Array<TView> = [];

  const connectedViewElements = viewElements.reduce<
    Array<FlattenedPartialViewElement>
  >((acc, viewElement) => {
    if (!viewElement.isParent) {
      const currentViewElement = acc.find(currentViewElement => {
        const siblingViewElementIds = currentViewElement.siblings.map(
          sibling => sibling.id
        );
        return siblingViewElementIds.includes(viewElement.id);
      });
      return [
        ...acc,
        { ...viewElement, parentId: currentViewElement.parentId }
      ];
    } else {
      const [first, ...rest] = restViews.length > 0 ? restViews : views;
      restViews = rest;
      return [...acc, { ...viewElement, parentId: first.id }];
    }
  }, []);
  return connectedViewElements;
};

export const flattenViewElements = (
  viewElements: Array<PartialViewElement>,
  key: string
) => {
  return viewElements.reduce<Array<FlattenedPartialViewElement>>(
    (acc, viewElement) => {
      if (viewElement[key]) {
        acc = [
          ...acc,
          {
            ...viewElement,
            isParent: true
          }
        ];
      } else {
        acc = [
          ...acc,
          {
            ...viewElement,
            isParent: false
          }
        ];
      }

      if (isArray(viewElement[key])) {
        acc = [...acc, ...flattenViewElements(viewElement[key], key)];
      }
      return acc;
    },
    []
  );
};
