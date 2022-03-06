import { PartialViewElement, TView } from '../types';

export const navigateById = (
  fromViewElementId: string,
  toViewElementId: string,
  views: Array<TView>,
  viewElements: Array<PartialViewElement>
) => {
  const fromViewElementIndex = viewElements.findIndex(
    viewElement => viewElement.id === fromViewElementId
  );

  const toViewElementIndex = viewElements.findIndex(
    viewElement => viewElement.id === toViewElementId
  );

  // directions: left = -1, right = 1
  const direction = toViewElementIndex < fromViewElementIndex ? -1 : 1;

  const distance = toViewElementIndex - fromViewElementIndex;

  const nextViewElements = viewElements.reduce<Array<PartialViewElement>>(
    (acc, viewElement) => {
      const fromView = views.find(view => view.id === viewElement.parentId);

      const fromViewIndex = views.findIndex(
        view => view.id === viewElement.parentId
      );

      const toView = views[fromViewIndex - distance];

      return [
        ...acc,
        {
          ...viewElement,
          parentId: toView.id,
          previousParentId: fromView.id,
          position: toView.position,
          previousPosition: fromView.position
        }
      ];
    },
    []
  );

  return {
    nextViewElements,
    direction
  };
};
